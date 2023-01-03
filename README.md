# Dune TS

![npm](https://img.shields.io/npm/v/dune-ts) ![npm bundle size](https://img.shields.io/bundlephobia/min/dune-ts)  
[![Linter Badge](https://img.shields.io/badge/linter-eslint-8080f2?style=flat-square&logo=eslint)](https://eslint.org)
[![Formatter Badge](https://img.shields.io/badge/formatter-prettier-f8bc45?style=flat-square&logo=prettier)](https://prettier.io)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![nps friendly](https://img.shields.io/badge/nps-friendly-blue.svg?style=flat-square)](https://github.com/sezna/nps)  
[![Coverage Status](https://coveralls.io/repos/github/r1oga/dune-ts/badge.svg?branch=main)](https://coveralls.io/github/r1oga/dune-ts?branch=main)
![GitHub Workflow Status (with branch)](https://img.shields.io/github/actions/workflow/status/r1oga/dune-ts/code-quality.yaml?label=Code%20Quality)  
![License Badge](https://img.shields.io/github/license/r1oga/dune-ts)

Work in Progress.  
Unofficial Dune Analytics Typescript Client.

## Motivation

Dune Analytics is a great tool for querying blockchain data.
However, it is currently only browser based which is not very developer friendly. An official API is being developed but
is only opened in [private beta](https://dune.com/docs/api/).
This library aims to provide an alternative way to integrate Dune Analytics into your Typescript projects.

## Features

- [x] Authentication with password and username.
- [x] Fetch results from Dune Analytics queries without parameters
- [ ] Fetch results from Dune Analytics queries with parameters

## Installation

```commandline
pnpm add dune-ts
yarn add dune-ts
npm install dune-ts
```

### Setup

Fill your credentials in `.config.yaml` or define `DUNE_PWD` and `DUNE_USER` environment variables.  
See [`config.sample.json`](config.sample.json) for an example.

## Local Development

Setup: `npm run setup`  
Check available scripts: `nps`  
Fetch Query Results: `nps "query -q <query-id> -u <username> -p <password>"`

## [Example](./example/index.ts)

```typescript
import { Dune } from 'dune-ts'

const dune = new Dune({ password, username })
await dune.login()
const { columns, data } = await dune.query(queryId)
```

## Credits

Based on [itzmestar/duneanalytics](https://github.com/itzmestar/duneanalytics)
