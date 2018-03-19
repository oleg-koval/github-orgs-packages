# github-orgs-packages ![linted_by _sexy](https://img.shields.io/badge/linted_by-_sexy-brightgreen.svg)

# Description

Get information for all packages inside of your github organisation

```sh
GH_AUTH_TOKEN=*** GH_ORG_NAME=*** npm start
```

Will produce similar output to:

```json
[
  {
    "name": "xyz",
    "description": "Publish npm packages with fewer screw-ups",
    "currentVersion": "3.0.0",
    "homepage": "https://github.com/davidchambers/xyz",
    "license": "WTFPL",
    "projects": [
      {
        "name": "cool-project",
        "version": "2.1.0",
        "description": "Description"
      }
    ]
  },
  {
    "name": "eslint",
    "description": "An AST-based pattern checker for JavaScript.",
    "currentVersion": "4.19.0",
    "homepage": "https://eslint.org",
    "license": "MIT",
    "projects": [
      {
        "name": "another-cool-project",
        "version": "2.1.0",
        "description": "Description"
      }
    ]
  }
]
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
