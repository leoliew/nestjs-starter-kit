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
import { Types } from 'mongoose';
import * as _ from 'lodash';
import { DateUtils } from '../../lib';
import { AppException } from '../exceptions/app.exception';

const sortKeys = [
  'requestId',
  'operatorId',
  'type',
  'requestTime',
  'responseTime',
  'retCode',
  'retMsg',
  'useTime',
  'params',
  'body',
  'query',
  'httpMethod',
  'url',
  'app',
  'version',
  'channel',
  'response',
  'errorStack',
  'agentName',
  'deviceId',
  'deviceModel',
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

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const ip = request.headers['ip'] || 'none';
    const deviceId = request.headers['deviceid'] || 'none';
    const deviceModel = request.headers['devicemodel'] || 'none';
    const requestId =
      request.headers['x-request-id'] || new Types.ObjectId().toString();
    const requestTime = Date.now();
    const version = request.headers['version'] || 'none';
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
      version,
      requestId,
      url,
      deviceId,
      deviceModel,
      ip,
      httpMethod: request.method,
      requestTime: DateUtils.getCurrentTime(requestTime),
    };
    return next.handle().pipe(
      tap((data) => {
        const tapRequest = context.switchToHttp().getRequest();
        const operatorId = tapRequest.body['operatorId'] || 'none';
        const agentName = tapRequest.headers['agentName'] || 'none';
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
          operatorId,
          agentName,
          useTime: responseTime - requestTime,
        } as any;
        const fileLog = formatRequestFileLog(log);
        if (!/health/.exec(url)) {
          // logger.info(fileLog)
          Logger.log(fileLog);
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
        const operatorId = tapRequest.body['operatorId'] || 'none';
        const agentName = tapRequest.headers['agentName'] || 'none';
        const responseTime = Date.now();
        const retMsg = _.get(error, 'message', 'none');
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
          operatorId,
          agentName,
        } as any;
        const fileLog = formatRequestFileLog(log);
        if (!/health/.exec(url)) {
          // logger.info(fileLog)
          Logger.log(fileLog);
          Logger.log(fileLog);
        }
        return throwError(error);
      }),
    );
  }
}
