import { HttpException, HttpStatus } from '@nestjs/common';

export class AppException extends HttpException {
  constructor(message: string, status?: number) {
    super(message, status || HttpStatus.OK);
  }
}
