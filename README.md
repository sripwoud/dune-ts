<div style='display: flex'>
  <img alt='ts icon' width='50' src='https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg'/>
  <span style='font-weight: bold'>&nbsp;&nbsp<strong>PROJECT TEMPLATE</strong></span>
</div>
<br/>

![Code Quality GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/r1oga/ts-template/code-quality.yaml?branch=main&label=Code%20Quality) ![Security Check GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/r1oga/ts-template/snyk.yaml?branch=main&label=Security%20%28Snyk%29)
[![Coverage Status](https://coveralls.io/repos/github/r1oga/ts-template/badge.svg?branch=main)](https://coveralls.io/github/r1oga/ts-template?branch=main)  
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)  
[![nps friendly](https://img.shields.io/badge/nps-friendly-blue.svg?style=flat-square)](https://github.com/sezna/nps)

| Feature                               | With                                                                                                                        | Configuration File                                                                                                                                                                                                                        |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Typings                               | [Typescript](https://www.typescriptlang.org/)                                                                               | [tsconfig.json](./tsconfig.json)                                                                                                                                                                                                          |
| Scripts                               | [Nps](https://github.com/sezna/nps)                                                                                         | [package-scripts.yaml](./package-scripts.yaml)                                                                                                                                                                                            |
| Testing                               | [Jest](https://jestjs.io/), [ts-jest](https://kulshekhar.github.io/ts-jest/)                                                | [jest.config.ts](test/jest.config.ts)                                                                                                                                                                                                     |
| Coverage reports                      | [Coveralls](https://coveralls.io/)                                                                                          | [Coveralls GitHub Action](https://github.com/marketplace/actions/coveralls-github-action)                                                                                                                                                 |
| Linting                               | [Eslint](https://eslint.org/)                                                                                               | [.eslintrc.yaml](./.eslintrc.yaml)                                                                                                                                                                                                        |
| Formatting                            | [Prettier](https://prettier.io/)                                                                                            | [.prettierrc.yaml](./.prettierrc.yaml)                                                                                                                                                                                                    |
| Continuous Integration                | [GitHub Workflow](https://docs.github.com/en/actions/using-workflows)                                                       | [.github/workflows](./.github/workflows)                                                                                                                                                                                                  |
| Import aliases                        | [Typescript paths](https://www.typescriptlang.org/tsconfig#paths), [module-alias](https://github.com/ilearnio/module-alias) | [tsconfig.json](https://github.com/r1oga/ts-template/blob/5d6983a6d28429b9dd256edf40bad5ee48c33d9c/tsconfig.json#L26), [package.json](https://github.com/r1oga/ts-template/blob/5d6983a6d28429b9dd256edf40bad5ee48c33d9c/package.json#L9) |
| Rollup exports                        | [Barrelsby](https://github.com/bencoveney/barrelsby)                                                                        | [.barrelsby.json](./.barrelsby.json)                                                                                                                                                                                                      |
| Containerization                      | [Docker](https://www.docker.com/)                                                                                           | [Dockerfile](./Dockerfile), [docker-compose.yaml](./docker-compose.yaml)                                                                                                                                                                  |
| Pre-commit hook (linting, formatting) | [Husky](https://typicode.github.io/husky), [lint-staged](https://github.com/okonet/lint-staged)                             | [pre-commit](./.husky/pre-commit), [.lintstagedrc.yaml](./.lintstagedrc.yaml)                                                                                                                                                             |
| Security Checks                       | [Snyk](https://snyk.io/)                                                                                                    | [snyk.yaml](./.github/workflows/snyk.yaml)                                                                                                                                                                                                |

## Start

Node

```commandline
npm run setup
nps start
```

Docker

```commandline
docker compose up
```
