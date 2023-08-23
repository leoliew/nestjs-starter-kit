import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  Logger,
  Inject,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import * as _ from 'lodash';
import { Constant, DateUtils } from '../../lib';
import { AppException } from '../exceptions/app.exception';
import { Types, Model, PaginateModel } from 'mongoose';
import { ClientLogs } from '../schemas/client-logs.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Cats } from '../../cats/schemas/cats.schema';

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
  // @Inject('ClientLogsModel')
  // private readonly clientLogsModel: Model<ClientLogs>;

  // constructor(
  //   @InjectModel('Cats', Constant.MONGODB.MAIN)
  //   private readonly catsModel: PaginateModel<Cats>,
  // ) {}

  constructor(
    @InjectModel('ClientLogs', Constant.MONGODB.MAIN)
    private readonly clientLogs: Model<ClientLogs>,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const ip =
      request.headers['ip'] +
        ',' +
        _.get(request.headers, 'ali-cdn-real-ip') +
        ',' +
        _.get(request.headers, 'x-forwarded-for') || 'none';
    const requestId = request.headers['x-request-id'] || new Types.ObjectId();
    const requestTime = Date.now();
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
      requestId,
      url,
      ip,
      httpMethod: request.method,
      requestTime: DateUtils.getCurrentTime(requestTime),
    };

    return next.handle().pipe(
      tap((data) => {
        const tapRequest = context.switchToHttp().getRequest();
        const userId = tapRequest.body['_userId'] || 'none';
        const responseTime = Date.now();
        const retCode = _.get(data, 'code', '0');
        const retMsg = _.get(data, 'message', 'success');
        const response = data;
        const log = {
          ...format,
          responseTime: DateUtils.getCurrentTime(responseTime),
          retCode,
          retMsg,
          response,
          body,
          params,
          userId,
          useTime: responseTime - requestTime,
        } as any;
        const fileLog = formatRequestFileLog(log);
        if (!/health/.exec(url)) {
          Logger.log(fileLog);
          const requestLog = {
            ...format,
            status: 'finish',
            responseTime,
            response,
            useTime: DateUtils.diff(requestTime, responseTime, 'ms'),
          };
          if (!/dashboard/.test(url) && !/card/.test(url)) {
            // this.clientLogsModel.create(requestLog).then().catch();
          }
        }
      }),

      catchError((error) => {
        let retCode = 500;
        if (error instanceof AppException) {
          retCode = -1;
        } else if (error instanceof HttpException) {
          retCode = error.getStatus();
        }
        const tapRequest = context.switchToHttp().getRequest();
        const userId = tapRequest.body['userId'] || 'none';
        const responseTime = Date.now();
        const retMsg = _.get(error, 'message', 'none');
        const response = { code: retCode, message: retMsg };
        const log = {
          ...format,
          responseTime: DateUtils.getCurrentTime(responseTime),
          retCode,
          retMsg,
          response: { code: retCode, message: retMsg },
          body,
          params,
          useTime: responseTime - requestTime,
          errorStack: error.stack,
          userId,
        } as any;
        const fileLog = formatRequestFileLog(log);
        if (!/health/.exec(url)) {
          Logger.error(fileLog);
        }
        const requestLog = {
          ...format,
          status: 'fail',
          responseTime,
          response,
          useTime: DateUtils.diff(requestTime, responseTime, 'ms'),
        };
        if (!/dashboard/.test(url) && !/card/.test(url)) {
          // this.clientLogsModel.create(requestLog).then().catch();
        }
        return throwError(error);
      }),
    );
  }
}
