import { of } from 'rxjs';
import { TransformInterceptor } from './transform.interceptor';
import { CallHandler, ExecutionContext } from '@nestjs/common';
import { Constant } from '../../lib';

describe('TransformInterceptor', () => {
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
    let returnValue: any;
    const returnCat = {
      name: 'Test Cat 1',
      breed: 'Test Breed 1',
      age: 4,
      id: 1,
    };

    it('should successfully call', (done) => {
      // if your interceptor has logic that depends on the context
      // you can always pass in a mock value instead of an empty object
      // just make sure to mock the expected alls like switchToHttp
      // and getRequest

      // create the mock CallHandler for the interceptor
      const next = {
        handle: () => of(returnCat),
      };
      const result = transformInterceptor.intercept(
        context,
        next as CallHandler,
      );
      result.subscribe({
        next: (value) => {
          returnValue = value;
        },
        error: (error) => {
          throw error;
        },
        complete: () => {
          done();
        },
      });
    });

    it('should successfully return', () => {
      expect(returnValue.data).toEqual(returnCat);
      expect(returnValue.code).toEqual(Constant.CUSTOM_RESPONSE_CODE.SUCCESS);
      expect(returnValue.message).toEqual(Constant.RESPONSE_MESSAGE.SUCCESS);
    });
  });
});
