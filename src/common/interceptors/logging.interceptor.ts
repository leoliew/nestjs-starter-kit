import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import * as _ from 'lodash';
import { Constant, DateUtils } from '../../lib';
import { AppException } from '../exceptions/app.exception';
import { Types, Model } from 'mongoose';
import { ClientLogs } from '../schemas/client-logs.schema';
import { InjectModel } from '@nestjs/mongoose';

const sortKeys = [
  'request_id',
  'user_id',
  'type',
  'request_time',
  'response_time',
  'resp_code',
  'resp_msg',
  'resp_msg',
  'use_time',
  'params',
  'body',
  'query',
  'http_method',
  'url',
  'response',
  'error_stack',
  'ip',
];

const formatRequestFileLog = function (log: any) {
  const values = sortKeys.map((key) => {
    const value = log[key];
    if (typeof value === 'object') {
      return JSON.stringify(value);
    } else {
      return value;
    }
  });
  return values.join('|#|');
};

/**
 * logs middleware
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  @InjectModel('ClientLogs', Constant.MONGODB.LOGS)
  private readonly clientLogs: Model<ClientLogs>;

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const ip =
      request.headers['ip'] +
        ',' +
        _.get(request.headers, 'ali-cdn-real-ip') +
        ',' +
        _.get(request.headers, 'x-forwarded-for') || 'none';
    const request_id = request.headers['x-request-id'] || new Types.ObjectId();
    const request_time = Date.now();
    const url = request.url;
    const requestParams = _.cloneDeep({
      ...request.query,
      ...request.body,
      ...request.params,
    });
    const body = _.cloneDeep(request.body);
    const params = _.cloneDeep(request.query);
    const format = {
      type: 'in',
      params: requestParams,
      request_id,
      url,
      ip,
      http_method: request.method,
      request_time: DateUtils.getCurrentTime(request_time),
    };

    return next.handle().pipe(
      tap((data) => {
        const tapRequest = context.switchToHttp().getRequest();
        const user_id = tapRequest.body['_userId'] || 'none';
        const response_time = Date.now();
        const resp_code = _.get(data, 'code', '0');
        const resp_msg = _.get(data, 'message', 'success');
        const response = data;
        const log = {
          ...format,
          response_time: DateUtils.getCurrentTime(response_time),
          resp_code,
          resp_msg,
          response,
          body,
          params,
          user_id,
          use_time: response_time - request_time,
        } as any;
        const fileLog = formatRequestFileLog(log);
        if (!/health/.exec(url)) {
          Logger.log(fileLog);
          const requestLog = {
            ...format,
            status: 'finish',
            response_time,
            response,
            use_time: DateUtils.diff(request_time, response_time, 'ms'),
          };
          if (!/dashboard/.test(url) && !/card/.test(url)) {
            // TODO: adjust log , to save user_id
            console.log(requestLog);
            this.clientLogs.create(requestLog).then().catch();
          }
        }
      }),

      catchError((error) => {
        let resp_code = 500;
        if (error instanceof AppException) {
          resp_code = -1;
        } else if (error instanceof HttpException) {
          resp_code = error.getStatus();
        }
        const tapRequest = context.switchToHttp().getRequest();
        const user_id = tapRequest.body['userId'] || 'none';
        const response_time = Date.now();
        const resp_msg = _.get(error, 'message', 'none');
        const response = { code: resp_code, message: resp_msg };
        const log = {
          ...format,
          response_time: DateUtils.getCurrentTime(response_time),
          resp_code,
          resp_msg,
          response: { code: resp_code, message: resp_msg },
          body,
          params,
          use_time: response_time - request_time,
          errorStack: error.stack,
          user_id,
        } as any;
        const fileLog = formatRequestFileLog(log);
        if (!/health/.exec(url)) {
          Logger.error(fileLog);
        }
        const requestLog = {
          ...format,
          status: 'fail',
          response_time,
          response,
          use_time: DateUtils.diff(request_time, response_time, 'ms'),
        };
        if (!/dashboard/.test(url) && !/card/.test(url)) {
          this.clientLogs.create(requestLog).then().catch();
        }
        return throwError(error);
      }),
    );
  }
}
