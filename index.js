const {
  pickAll, chain, map, toPairs, fromPairs, is, clone, pick, uniq, groupBy, flatten, reject, isNil
} = require('ramda');
const Promise = require('bluebird');
const GitHub = require('github-api');
const info = require('package-info');

const token = process.env.GH_AUTH_TOKEN;
const orgName = process.env.GH_ORG_NAME;
const repoFields = [
  'name',
  'id',
  'private',
  'html_url',
  'description',
  'created_at',
  'updated_at',
  'ssh_url',
  'git_url',
  'owner.login'
];
const dependenciesTypes = [
  'dependencies',
  'devDependencies',
  'peerDependencies',
  'bundledDependencies',
  'optionalDependencies'
];

const gh = new GitHub({ token });
const getReposList = Promise.method(() => {
  const org = gh.getOrganization(orgName);
  const getRepos = org.getRepos();

  return getRepos
    .then((repos) => {
      const { data: reposList } = repos;
      return reposList;
    })
    .catch((err) => {
      console.error({ err }, 'getReposList: Error during getting repos list');
    });
});

const flattenObj = (obj) => {
  const go = obj_ => chain(([k, v]) => {
    if (Object.prototype.toString.call(v) === '[object Object]') {
      return map(([k_, v_]) => [`${k}.${k_}`, v_], go(v));
    }
    return [[k, v]];

  }, toPairs(obj_));

  return fromPairs(go(obj));
};

const getPackageJson = (repo) => {
  const _repo = gh.getRepo(repo['owner.login'], repo.name);
  const ref = 'master';
  const path = 'package.json';
  const raw = true;
  return _repo
    .getContents(ref, path, raw)
    .then(({ data }) => data)
    .catch((err) => {
      if (err.response.status === 404) {
        console.warn(`warn: package.json not found for ${repo.name}`);
        return;
      }
      throw err;
    });
};

const getRepoProps = repo => pickAll(repoFields, repo);

const normalizePackageJson = (packageJson) => {
  if (!is(Object, packageJson)) { return; }

  const fields = clone(dependenciesTypes);
  fields.push('name', 'version', 'description', 'private');
  const flatPackageJson = flattenObj(pick(fields, packageJson));

  const dependencies = [];
  for (const key in flatPackageJson) {
    if (key.indexOf('.') !== -1) {
      dependencies.push({
        name: key.split('.')[1],
        usedVersion: flatPackageJson[key]
      });
      delete flatPackageJson[key];
    }
  }

  flatPackageJson.dependencies = uniq(dependencies);

  return flatPackageJson;
};

const getDependecyDescriptions = (data) => {
  if (!is(Object, data)) { return; }
  return Promise.each(data.dependencies, (dependency) => {
    const information = info(dependency.name);
    return information
      .then((depInformation) => {
        dependency.depName = dependency.name;
        delete dependency.name;
        dependency.depCurrentVersion = depInformation.version;
        dependency.depDescription = depInformation.description;
        dependency.depHomepage = depInformation.homepage;
        dependency.depLicense = depInformation.license;
        dependency.projectName = data.name;
        dependency.projectVersion = data.version;
        dependency.projectDescription = data.description;

        return dependency;
      })
      .catch((err) => {
        const { path, message, host } = err;
        console.warn(`warn: ${message}: ${path} @ ${host}`);
      });
  });
};

const groupByProjectName = projects => groupBy(project => project.depName)(projects);

const remapGroupedDeps = deps => Object.keys(deps).map((key) => {
  return {
    name: key,
    description: deps[key][0].depDescription,
    currentVersion: deps[key][0].depCurrentVersion,
    homepage: deps[key][0].depHomepage,
    license: deps[key][0].depLicense,
    projects: deps[key].map((p) => {
      const {
        projectName: name,
        projectVersion: version,
        projectDescription: description,
      } = p;
      return {
        name,
        version,
        description
      };
    })
  };
});

module.exports = getReposList()
  .map(flattenObj)
  .map(getRepoProps)
  .map(getPackageJson)
  .then(reject(isNil))
  .map(normalizePackageJson)
  .map(getDependecyDescriptions)
  .then(flatten)
  .then(groupByProjectName)
  .then(remapGroupedDeps)
  .then(Promise.resolve)
  .catch(Promise.reject);
