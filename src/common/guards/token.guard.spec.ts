import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TokenGuard } from './token.guard';

describe('Token Guard', () => {
  let guard: TokenGuard;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [TokenGuard],
    }).compile();

    guard = moduleRef.get<TokenGuard>(TokenGuard);
  });

  it('should allow access and set user in request object when token is valid', async () => {
    const context: ExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: 'Bearer nestjs',
          },
        }),
      }),
    } as ExecutionContext;
    expect(await guard.canActivate(context)).toBeTruthy();
  });

  it('should throw UnauthorizedException when token is invalid', async () => {
    const context: ExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: 'Bearer invalid-token',
          },
        }),
      }),
    } as ExecutionContext;

    await expect(guard.canActivate(context)).rejects.toThrowError(
      'Unauthorized',
    );
  });

  it('should throw UnauthorizedException when token is missing', async () => {
    const context: ExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {},
        }),
      }),
    } as ExecutionContext;
    try {
      await guard.canActivate(context);
    } catch (e) {
      expect(e).toBeInstanceOf(UnauthorizedException);
    }
  });
});
