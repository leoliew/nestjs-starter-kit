import {
  ArgumentsHost,
  BadRequestException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';
import { Constant } from '../../lib';

describe('HttpException Filter', () => {
  let filter: HttpExceptionFilter;
  let responseMock: any;
  let hostMock: ArgumentsHost;

  beforeEach(() => {
    filter = new HttpExceptionFilter();
    responseMock = {
      header: jest.fn(),
      status: jest.fn(),
      send: jest.fn(),
    };
    hostMock = {
      switchToHttp: jest.fn().mockReturnThis(),
      getResponse: jest.fn().mockReturnValue(responseMock),
    } as any;
    Logger.error = jest.fn();
  });

  it('should handle known exceptions', () => {
    const exception = new Error('AppException');
    filter.catch(exception, hostMock);

    expect(Logger.error).toHaveBeenCalledWith(
      'system internal error: + Error: AppException',
    );
    expect(responseMock.header).toHaveBeenCalledWith(
      'Content-Type',
      'application/json; charset=utf-8',
    );
    expect(responseMock.status).toHaveBeenCalledWith(
      HttpStatus.SERVICE_UNAVAILABLE,
    );
    expect(responseMock.send).toHaveBeenCalledWith({
      code: Constant.CUSTOM_RESPONSE_CODE[HttpStatus.SERVICE_UNAVAILABLE],
      message: 'AppException',
    });
  });

  it('should handle bad request exceptions', () => {
    const exception = new BadRequestException(
      Constant.RESPONSE_MESSAGE.BAD_REQUEST,
    );
    filter.catch(exception, hostMock);
    expect(responseMock.send).toHaveBeenCalledWith({
      code: Constant.CUSTOM_RESPONSE_CODE[HttpStatus.BAD_REQUEST],
      message: Constant.RESPONSE_MESSAGE.BAD_REQUEST,
    });
  });

  it('should handle unknown exceptions', () => {
    const exception = new Error('UnknownException');
    filter.catch(exception, hostMock);

    expect(Logger.error).toHaveBeenCalledWith(
      'system internal error: + Error: UnknownException',
    );
    expect(responseMock.header).toHaveBeenCalledWith(
      'Content-Type',
      'application/json; charset=utf-8',
    );
    expect(responseMock.status).toHaveBeenCalledWith(
      HttpStatus.SERVICE_UNAVAILABLE,
    );
    expect(responseMock.send).toHaveBeenCalledWith({
      code: Constant.CUSTOM_RESPONSE_CODE[HttpStatus.SERVICE_UNAVAILABLE],
      message: 'UnknownException',
    });
  });
});
