import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
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

const excludePatterns = [/dashboard/, /card/, /health/];

/**
 * logs middleware
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  @InjectModel('ClientLogs', Constant.MONGODB.LOGS)
  private readonly clientLogs: Model<ClientLogs>;

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const ip = request.ip || 'none';
    const request_id = request.headers['x-request-id'] || new Types.ObjectId();
    const request_time = Date.now();
    const url = request.url;
    const body = _.cloneDeep(request.body) || {};
    const params = _.cloneDeep(request.params) || {};
    const query = _.cloneDeep(request.query) || {};
    const format = {
      type: 'in',
      params,
      body,
      query,
      request_id,
      url,
      ip,
      http_method: request.method,
      request_time: DateUtils.getCurrentTime(request_time),
    };

    return next.handle().pipe(
      tap((data) => {
        const tapRequest = context.switchToHttp().getRequest();
        const user_id =
          tapRequest['user_id'] || tapRequest.body['user_id'] || 'none';
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
          user_id,
          use_time: DateUtils.diff(request_time, response_time, 'ms'),
          error_stack: '',
        } as any;
        const fileLog = formatRequestFileLog(log);
        if (!excludePatterns.some((pattern) => pattern.test(url))) {
          Logger.log(fileLog);
          this.clientLogs.create(log).then().catch();
        }
      }),

      catchError((error) => {
        const resp_code = Constant.CUSTOM_RESPONSE_CODE.SERVICE_UNAVAILABLE;
        const tapRequest = context.switchToHttp().getRequest();
        const user_id =
          tapRequest['user_id'] || tapRequest.body['user_id'] || 'none';
        const response_time = Date.now();
        const resp_msg = _.get(error, 'message', 'none');
        const log = {
          ...format,
          response_time: DateUtils.getCurrentTime(response_time),
          resp_code,
          resp_msg,
          response: { code: resp_code, message: resp_msg },
          user_id,
          use_time: DateUtils.diff(request_time, response_time, 'ms'),
          error_stack: error.stack,
        } as any;
        const fileLog = formatRequestFileLog(log);
        if (!excludePatterns.some((pattern) => pattern.test(url))) {
          Logger.error(fileLog);
          this.clientLogs.create(log).then().catch();
        }
        throw new AppException(error);
      }),
    );
  }
}
