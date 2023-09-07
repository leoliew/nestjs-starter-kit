import { lastValueFrom, of } from 'rxjs';
import { TransformInterceptor } from './transform.interceptor';
import { CallHandler, ExecutionContext, HttpStatus } from '@nestjs/common';
import { Constant } from '../../lib';

describe('Transform Interceptor', () => {
  let transformInterceptor: TransformInterceptor<Response>;
  let context: ExecutionContext;
  let responseMock: any;

  beforeEach(() => {
    transformInterceptor = new TransformInterceptor();
    context = {
      switchToHttp: jest.fn(() => ({
        getRequest: jest.fn(() => ({
          warp: true,
        })),
        getResponse: jest.fn(() => responseMock),
      })),
    } as unknown as ExecutionContext;

    responseMock = {
      status: jest.fn(),
    };
  });
  it('should be defined', () => {
    expect(transformInterceptor).toBeDefined();
  });

  describe('should return the data wrapped in data object', () => {
    // we use done here to be able to tell the observable subscribe function
    // when the observable should finish. If we do not pass done
    // Jest will complain about an asynchronous task not finishing within 5000 ms.
    const returnCat = {
      name: 'Test Cat 1',
      breed: 'Test Breed 1',
      age: 4,
      id: 1,
    };

    it('should successfully call', async () => {
      // if your interceptor has logic that depends on the context
      // you can always pass in a mock value instead of an empty object
      // just make sure to mock the expected alls like switchToHttp
      // and getRequest

      // create the mock CallHandler for the interceptor
      const next = {
        handle: () => of(returnCat),
      };
      const resultObservable = transformInterceptor.intercept(
        context,
        next as CallHandler,
      );
      const result: any = await lastValueFrom(resultObservable);
      expect(result.data).toEqual(returnCat);
      expect(result.code).toEqual(Constant.CUSTOM_RESPONSE_CODE[HttpStatus.OK]);
      expect(result.message).toEqual(Constant.RESPONSE_MESSAGE.SUCCESS);
    });
  });
});
