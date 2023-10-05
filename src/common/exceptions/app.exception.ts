import { HttpException, HttpStatus } from '@nestjs/common';
import { Constant } from '../../lib';

export class AppException extends HttpException {
  code: number;
  constructor(
    message: string,
    code: number = Constant.CUSTOM_RESPONSE_CODE[
      HttpStatus.INTERNAL_SERVER_ERROR
    ],
  ) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
    this.code = code;
    this.name = 'HttpException';
  }
}
