API Calls are now included in the dune [free tier](https://dune.com/pricing), which makes this library obsolete.  
You should rather follow the dune [documentation](https://dune.com/docs/api/) to make programmatic calls to the Dune API.
---
# Dune TS

[![npm](https://img.shields.io/npm/v/dune-ts)](https://www.npmjs.com/package/dune-ts) [![npm bundle size](https://img.shields.io/bundlephobia/min/dune-ts)](https://www.npmjs.com/package/dune-ts)  
[![Linter Badge](https://img.shields.io/badge/linter-eslint-8080f2?style=flat-square&logo=eslint)](https://eslint.org)
[![Formatter Badge](https://img.shields.io/badge/formatter-prettier-f8bc45?style=flat-square&logo=prettier)](https://prettier.io)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![nps friendly](https://img.shields.io/badge/nps-friendly-blue.svg?style=flat-square)](https://github.com/sezna/nps)  
[![Coverage Status](https://coveralls.io/repos/github/r1oga/dune-ts/badge.svg?branch=main)](https://coveralls.io/github/r1oga/dune-ts?branch=main)
[![GitHub Code Quality Workflow Status](https://img.shields.io/github/actions/workflow/status/r1oga/dune-ts/code-quality.yaml?label=code%20quality)](https://github.com/r1oga/dune-ts/actions/workflows/code-quality.yaml)  
[![License Badge](https://img.shields.io/github/license/r1oga/dune-ts)](https://github.com/r1oga/dune-ts/blob/main/LICENSE)

Unofficial Dune Analytics Typescript Client.

## Motivation

[Dune Analytics](https://dune.com) is a great tool for querying blockchain data.
However, it is currently only browser based which is not very developer friendly. An official API is being developed but
is only opened in [private beta](https://dune.com/docs/api/).
This library aims to provide an alternative way to integrate Dune Analytics into your Typescript projects.

## Features

- [x] Authentication with password and username.
- [x] Fetch results from Dune Analytics queries with parameters

## Installation

```commandline
pnpm add dune-ts
yarn add dune-ts
npm install dune-ts
```

### Setup

Define `DUNE_PASSWORD` and `DUNE_USERNAME` environment variables.  
Alternatively, you can pass the credentials to the `Dune` constructor.

## Local Development

Setup: `npm run setup`  
Check available scripts: `nps`  
Fetch Query Results: `nps "query -q <query-id> -u <username> -p <password>"`

## How To Use

`Dune.query` requires a `queryId` (can be looked up in the URL of the query `https://dune.com/queries/<queryId>`) and accepts an optional array describing your query parameters (that you defined in the online query editor).

- number parameter: `{ key: 'parameterName', value: '123', type: 'number' }`
- text parameter: `{ key: 'parameterName', value: '123', type: 'text' }`
- date parameter: `{ key: 'parameterName', value: new Date(), type: 'datetime' }`
- list parameter: not supported by this lib yet

```typescript
import { Dune } from 'dune-ts'

const dune = new Dune({ password, username })

const { columns, data } = await dune.query(queryId, [
  { key: 'key', value: 'value', type: 'text' },
])
```

### [Example](./example/index.ts)

## Disclaimer

This is an experimental library. It'll break as soon as Dune Analytics change their graphql endpoints (URL or parameters).  
This isn't free of bugs either. Contributions are welcome!

## [Contribute](https://github.com/r1oga/dune-ts/contribute)

## Credits

Based on [itzmestar/duneanalytics](https://github.com/itzmestar/duneanalytics)
