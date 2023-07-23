import {
  ExceptionFilter,
  ArgumentsHost,
  Catch,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import * as _ from 'lodash';
import { Constant } from '../../lib';

interface ExceptionMapping {
  [key: string]: {
    status: number;
    code: number;
    logMessage: string;
  };
}

const exceptionMapping: ExceptionMapping = {
  AppException: {
    status: HttpStatus.SERVICE_UNAVAILABLE,
    code: Constant.CUSTOM_RESPONSE_CODE.SERVICE_UNAVAILABLE,
    logMessage: '业务逻辑错误',
  },
  BadRequestException: {
    status: HttpStatus.BAD_REQUEST,
    code: Constant.CUSTOM_RESPONSE_CODE.BAD_REQUEST,
    logMessage: '请求参数错误 HttpException',
  },
  UnauthorizedException: {
    status: HttpStatus.UNAUTHORIZED,
    code: Constant.CUSTOM_RESPONSE_CODE.UNAUTHORIZED,
    logMessage: '请求鉴权错误 HttpException',
  },
  HttpException: {
    status: HttpStatus.SERVICE_UNAVAILABLE,
    code: Constant.CUSTOM_RESPONSE_CODE.SERVICE_UNAVAILABLE,
    logMessage: '系统内部错误 HttpException',
  },
};

@Catch(Error)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    response.header('Content-Type', 'application/json; charset=utf-8');

    const exceptionType = exception.constructor.name;
    const mapping = exceptionMapping[exceptionType];

    if (mapping) {
      Logger.error(`${mapping.logMessage} + ${exception.message}`);
      response.status(mapping.status);
      response.send({
        code: mapping.code,
        message: exception.message,
      });
    } else {
      Logger.error(`系统内部错误 + ${exception}`);
      response.status(
        _.get(exception, 'status', HttpStatus.SERVICE_UNAVAILABLE),
      );
      response.send({
        code: _.get(
          exception,
          'status',
          Constant.CUSTOM_RESPONSE_CODE.SERVICE_UNAVAILABLE,
        ),
        message: exception.message,
      });
    }
  }
}
