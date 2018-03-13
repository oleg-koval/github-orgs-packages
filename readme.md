# github-orgs-packages ![linted_by _sexy](https://img.shields.io/badge/linted_by-_sexy-brightgreen.svg)

Get information for all packages inside of your github organisation

```sh
GH_AUTH_TOKEN=*** GH_ORG_NAME=*** npm start
```

Will produce similar output to:

```js
{ xyz:
   [ { usedVersion: '^2.1.0',
       depName: 'xyz',
       depCurrentVersion: '3.0.0',
       depDescription: 'Publish npm packages with fewer screw-ups',
       depHomepage: 'https://github.com/davidchambers/xyz',
       depLicense: 'WTFPL',
       projectName: 'cool project #1',
       projectVersion: '1.1.0',
       projectDescription: 'cool project description' } ],
  eslint:
   [ { usedVersion: '4.1.1',
       depName: 'eslint',
       depCurrentVersion: '4.18.2',
       depDescription: 'An AST-based pattern checker for JavaScript.',
       depHomepage: 'https://eslint.org',
       depLicense: 'MIT',
       projectName: 'cool project #2',
       projectVersion: '1.2.0',
       projectDescription: 'cool project description' } ] }
```

## Dependencies

- [bluebird](https://ghub.io/bluebird): Full featured Promises/A+ implementation with exceptionally good performance
- [github-api](https://ghub.io/github-api): A higher-level wrapper around the Github API.
- [package-info](https://ghub.io/package-info): Get the information of a npm package
- [ramda](https://ghub.io/ramda): A practical functional library for JavaScript programmers.

## Dev Dependencies

- [eslint](https://ghub.io/eslint): An AST-based pattern checker for JavaScript.
- [eslint-config-sexy](https://ghub.io/eslint-config-sexy): Mostly sexy config

## License

ISC © [Oleg Koval](https://github.com/oleg-koval)
