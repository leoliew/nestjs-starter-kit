import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class TokenGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization;

    if (token != null && token != '') {
      const cleanedToken = token.replace('Bearer ', '');

      return this.checkUserInfo({ token: cleanedToken })
        .then((user) => {
          request['user'] = user;
          return true;
        })
        .catch((error) => {
          this.accessDenied(error.message);
          return false;
        });
    } else {
      this.accessDenied();
      return false;
    }
  }

  private accessDenied(msg?: string): void {
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
