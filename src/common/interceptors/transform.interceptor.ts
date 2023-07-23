import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
  HttpStatus,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Constant } from '../../lib';

interface Response<T> {
  code: number;
  data: T;
  message: string;
}

export class NotWarpInterceptor<T>
  implements NestInterceptor<T, Response<T> | T>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T> | T> {
    const request = context.switchToHttp().getRequest();
    request.warp = false;
    return next.handle().pipe(map((data) => data));
  }
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T> | T>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T> | T> {
    const request = context.switchToHttp().getRequest();
    request.warp = true;
    return next.handle().pipe(
      map((data) => {
        const http = context.switchToHttp();
        const res = http.getResponse();
        if (request.warp) {
          res.status(HttpStatus.OK);
          return {
            data,
            code: Constant.CUSTOM_RESPONSE_CODE.SUCCESS,
            message: Constant.RESPONSE_MESSAGE.SUCCESS,
          };
        } else {
          return data;
        }
      }),
    );
  }
}
