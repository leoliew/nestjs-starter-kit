import {
  ExceptionFilter,
  ArgumentsHost,
  Catch,
  HttpException,
  Logger,
  HttpStatus,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { AppException } from '../exceptions/app.exception';
import * as _ from 'lodash';
import { Constant } from '../../lib';

@Catch(Error)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    response.header('Content-Type', 'application/json; charset=utf-8');
    if (exception instanceof AppException) {
      console.log(exception);
      Logger.error(`业务逻辑错误 + ${exception.message}`);
      response.status(HttpStatus.SERVICE_UNAVAILABLE);
      response.send({
        message: exception.message,
        code: Constant.CUSTOM_RESPONSE_CODE.SERVICE_UNAVAILABLE,
      });
    } else if (exception instanceof BadRequestException) {
      Logger.error(`请求参数错误 HttpException + ${exception.message}`);
      response.status(HttpStatus.BAD_REQUEST);
      response.send({
        code: Constant.CUSTOM_RESPONSE_CODE.BAD_REQUEST,
        message: exception.message,
      });
    } else if (exception instanceof UnauthorizedException) {
      Logger.error(`请求鉴权错误 HttpException + ${exception.message}`);
      response.status(HttpStatus.UNAUTHORIZED);
      response.send({
        code: Constant.CUSTOM_RESPONSE_CODE.UNAUTHORIZED,
        message: exception.message,
      });
    } else if (exception instanceof HttpException) {
      // TODO: http 错误不属于系统内部错误，需要区分
      Logger.error(`系统内部错误 HttpException + ${exception.message}`);
      response.status(HttpStatus.SERVICE_UNAVAILABLE);
      response.send({
        code: Constant.CUSTOM_RESPONSE_CODE.SERVICE_UNAVAILABLE,
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
