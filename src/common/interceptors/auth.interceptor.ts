import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor() {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    // const response = context.switchToHttp().getResponse();

    let token = request.headers.authorization;
    if (token != null && token != '') {
      token = token.replace('Bearer ', '');
      return this.checkUserInfo({ token })
        .then(async (user) => {
          request['user'] = user;
          return next.handle().pipe(
            tap(() => {
              // 请求处理后的操作，如果需要的话
            }),
          );
        })
        .catch((error) => {
          // console.error(error);
          this.accessDenied(error.message);
        }) as any;
    } else {
      this.accessDenied();
    }
  }

  private accessDenied(msg?: string) {
    throw new UnauthorizedException(msg);
  }

  private async checkUserInfo({ token }: { token: string }) {
    if (token === 'nestjs') {
      return {
        _id: '5f9b3b0b9b0b1c1b1b1b1b1b',
        email: 'demo@gmail.com',
        name: 'demo',
      };
    } else {
      this.accessDenied();
    }
  }
}
