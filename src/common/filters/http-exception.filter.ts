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
  InternalServerErrorException: {
    status: HttpStatus.SERVICE_UNAVAILABLE,
    code: Constant.CUSTOM_RESPONSE_CODE[HttpStatus.SERVICE_UNAVAILABLE],
    logMessage: 'business logic error AppException',
  },
  BadRequestException: {
    status: HttpStatus.BAD_REQUEST,
    code: Constant.CUSTOM_RESPONSE_CODE[HttpStatus.BAD_REQUEST],
    logMessage: 'request parameter error HttpException',
  },
  UnauthorizedException: {
    status: HttpStatus.UNAUTHORIZED,
    code: Constant.CUSTOM_RESPONSE_CODE[HttpStatus.UNAUTHORIZED],
    logMessage: 'request authentication error HttpException',
  },
  HttpException: {
    status: HttpStatus.SERVICE_UNAVAILABLE,
    code: Constant.CUSTOM_RESPONSE_CODE[HttpStatus.SERVICE_UNAVAILABLE],
    logMessage: 'system internal error HttpException',
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
      Logger.error(`${mapping.logMessage}: + ${exception.message}`);
      response.status(mapping.status);
      response.send({
        code: mapping.code,
        message: exception.message,
      });
    } else {
      Logger.error(`system internal error: + ${exception}`);
      response.status(
        _.get(exception, 'status', HttpStatus.SERVICE_UNAVAILABLE),
      );
      response.send({
        code: _.get(
          exception,
          'status',
          Constant.CUSTOM_RESPONSE_CODE[HttpStatus.SERVICE_UNAVAILABLE],
        ),
        message: exception.message,
      });
    }
  }
}
