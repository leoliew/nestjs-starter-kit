
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deploy to production

- set environment variable `NODE_ENV=production`
- according to `config/production.js` config file, set environment variable
- use Docker to build production environment, and inject related environment variables into the container

## Feature

### Main Feature

- [x] swagger / OpenAPI 3 included
- [x] swagger API can auth with JWT
- [x] global error handler
- [ ] interface cache
- [ ] interface anti-repetition limit
- [ ] multi-module reference specification

### Http Request

- [x] dto template
- [x] token auth guard demo [link](https://github.com/leoliew/nestjs-starter-kit/blob/main/src/common/guards/token.guard.ts)
- [x] request parameter validation [link](https://github.com/leoliew/nestjs-starter-kit/blob/main/src/common/validation/validation.pipe.ts)
- [x] response unified [link](https://github.com/leoliew/nestjs-starter-kit/blob/main/src/common/interceptors/transform.interceptor.ts#L47)
- [x] response unified custom status code [link](https://github.com/leoliew/nestjs-starter-kit/blob/main/src/lib/constant.ts#L20)
- [x] response unified return status code/custom status code [link](https://github.com/leoliew/nestjs-starter-kit/blob/main/docs/ResponseReference.md) 
- [x] external request encapsulation, support log saving, proxy service, etc. [link](https://github.com/leoliew/nestjs-starter-kit/blob/main/src/external/request.ts)
- [x] stream response demo [link](https://github.com/leoliew/nestjs-starter-kit/blob/main/src/cats/cats.controller.ts#L97)

### Database

- [x] support multiple Mongodb databases
- [x] support pagination of Mongodb database
- [x] support Mongodb field encryption

### Logger and Debugger

- [x] support logs level setting
- [x] unified request log format
- [x] request log selective write to Mongodb

### Security

- [x] Google Cloud KMS encrypt/decrypt demo

### Setting

- [x] support multiple environment configuration files
- [x] use .nvmrc to manage node version

### Test
- [x] support e2e test
- [x] support unit test with using test mongodb
- [ ] support unit test with using [mongodb memory server](https://github.com/nodkz/mongodb-memory-server)

### Release

- [x] support [railway](https://railway.app/) deployment
- [x] support docker build by Makefile
- [x] http health check for kubernetes deployment
