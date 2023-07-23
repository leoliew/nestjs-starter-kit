
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

## Feature

### Main Feature
- Swagger / OpenAPI 3 included
- API swagger 文档，并且可以鉴权
- 接口缓存（暂时不重要）
- 多模块之间互相引用规范
- 全局错误 catch，包括格式错误 catch


### Http Request
- 外部请求封装
- 外部请求日志保存
- 外部请求代理


### Database

- 连接多个数据库 Y
- 数据库分页

### Logger and Debugger
- 规范请求日志
- response 状态码规范
- request /response 命名规范

### Security
- 数据库加密

### Setting
- 请求鉴权
- 请求内容格式校验
