import * as _ from 'lodash';
import * as request from 'superagent';
import * as withProxy from 'superagent-proxy';
import { Inject, Injectable } from '@nestjs/common';
import {
  RequestLogs,
  RequestLogsSchema,
  RequestLogStatus,
} from './schemas/request-logs.schema';
import DateUtils from '../lib/date-utils';
import { Model } from 'mongoose';

withProxy(request);

@Injectable()
export class Request {
  @Inject('RequestLogsModel')
  private readonly requestLogsModel: Model<RequestLogs>;

  protected name;

  async sendData(data: {
    url: string;
    body?: any;
    options?: any;
    query?: any;
    skipLog?: boolean;
  }) {
    const { url, body, options, query, skipLog } = data;
    // save request Log
    const proxyLog = {
      service: this.name,
      requestTime: DateUtils.getCurrentTime(),
      method: options.method,
      url,
      query,
      headers: options.header,
      body,
      status: RequestLogStatus.PENDING,
    };
    let res = null;
    let response = null;
    const httpMethod = options.httpMethod || 'post';
    try {
      const agent = request[httpMethod](url)
        .type(options.postType)
        .timeout(Math.abs(options.requestTimeout || 60000))
        .query(query || {})
        .send(body)
        .set('Accept', options.Accept)
        .set(options.headers || {});
      if (options.proxy) {
        agent.proxy(options.proxy);
      }
      res = await agent;
      response = JSON.parse(res.text);
      proxyLog.status = RequestLogStatus.FINISH;
      proxyLog['response'] = response;
    } catch (err) {
      response = {
        err: err.message,
        status: err.status,
        body: _.get(err, 'response.body'),
      };
      proxyLog.status = RequestLogStatus.ERROR;
      proxyLog['response'] = response;
    }
    // 保存 proxy log 数据
    proxyLog['responseTime'] = DateUtils.getCurrentTime();
    proxyLog['useTime'] = DateUtils.diff(
      proxyLog.requestTime,
      proxyLog['responseTime'],
      'ms',
    );
    res['useTime'] = proxyLog['useTime'];
    if (!skipLog) {
      await this.requestLogsModel.create(proxyLog);
    }
    return response;
  }

  async get({
    url,
    options,
    query,
    skipLog,
  }: {
    url: string;
    options: any;
    query?: any;
    skipLog?: boolean;
  }) {
    options = options || {};
    options.Accept = 'application/json';
    options.httpMethod = 'get';
    options.postType = 'json';
    options.skip = true;
    return await this.sendData({ url, options, query, skipLog });
  }

  async post({
    url,
    body,
    options,
    skipLog,
  }: {
    url: string;
    body?: any;
    options?: any;
    skipLog?: boolean;
  }) {
    options = options || {};
    options.Accept = 'application/json';
    options.postType = 'json';
    options.httpMethod = 'post';
    const params = { url, body, options, skipLog };
    return await this.sendData(params);
  }
}
