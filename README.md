
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

- 设置环境变量 `NODE_ENV=production`
- 根据 `config/production.js` 配置文件，设置环境变量
- 使用 Docker 构建生产环境，并把相关的环境变量注入到容器中

## Feature

### Main Feature

- [x] Swagger / OpenAPI 3 included
- [x] Swagger API 文档可鉴权
- [x] 全局错误捕获处理
- [ ] 接口缓存设置
- [ ] 接口防重限制
- [ ] 多模块之间互相引用规范

### Http Request

- [x] 常见 DTO 模版
- [x] 登录鉴权 Demo
- [x] Request 参数校验/转换
- [x] Response 统一返回结构
- [x] Response 统一返回状态码/自定义状态码
- [x] 外部请求封装，支持日志保存，代理服务等
- [x] 流输出 Demo  

### Database

- [x] 支持连接多个 Mongodb 数据库
- [x] Mongodb 数据库分页 Demo
- [x] Mongodb 数据库字段加密 Demo

### Logger and Debugger

- [x] 日志级别设置
- [ ] 统一请求日志记录
- [ ] 请求日志选择性写入 Mongodb 

### Security

- [x] Google Cloud KMS 加密场景 Demo
- [ ] 数据库字段加解密 Demo 

### Setting

- [x] 配置文件支持多环境

### Release

- [x] Railway 支持
- [x] Docker 构建支持 
