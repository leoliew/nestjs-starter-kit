import { lastValueFrom, of } from 'rxjs';
import { CallHandler, ExecutionContext } from '@nestjs/common';
import { Constant, DateUtils } from '../../lib';
import { LoggingInterceptor } from './logging.interceptor';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../../database/database.module';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { mockModel } from '../../../test/test-helper';
import {
  ClientLogs,
  ClientLogsSchema,
  ClientLogsTypes,
} from '../schemas/client-logs.schema';

describe('Logging Interceptor', () => {
  let loggingInterceptor: LoggingInterceptor;
  let context: ExecutionContext;
  let responseMock: any;
  let clientLogsModel: Model<ClientLogs>;
  let body;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        MongooseModule.forFeature(
          [{ name: ClientLogs.name, schema: ClientLogsSchema }],
          Constant.MONGODB.LOGS,
        ),
      ],
      providers: [LoggingInterceptor],
    }).compile();
    loggingInterceptor = module.get(LoggingInterceptor);
    clientLogsModel = module.get<Model<ClientLogs>>(
      getModelToken('ClientLogs', Constant.MONGODB.LOGS),
    );

    body = mockModel.mockCat({});
    context = {
      switchToHttp: jest.fn(() => ({
        getRequest: jest.fn(() => ({
          warp: true,
          headers: {
            'x-forwarded-for': '127.0.0.1, 172.71.214.238, 34.111.165.210',
          },
          query: {
            page: 1,
          },
          params: {
            id: '1',
          },
          body: body,
          method: 'POST',
          url: '/cats/create',
        })),
        getResponse: jest.fn(() => responseMock),
      })),
    } as unknown as ExecutionContext;

    responseMock = {
      status: jest.fn(),
    };
  });
  it('should be defined', () => {
    expect(loggingInterceptor).toBeDefined();
  });

  describe('should return the data wrapped in data object', () => {
    // let clientLogs: ClientLogs;
    it('should successfully call', async () => {
      const next = {
        handle: () => of(body),
      };
      const resultObservable = loggingInterceptor.intercept(
        context,
        next as CallHandler,
      );
      const result = await lastValueFrom(resultObservable);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const clientLogs = await clientLogsModel.findOne();
      console.log('clientLogs', clientLogs);
      expect(result).toEqual(body);
      expect(clientLogs).toBeDefined();
      expect(clientLogs).toHaveProperty('request_id');
      expect(clientLogs).toHaveProperty('request_time');
      expect(clientLogs).toHaveProperty('response_time');
      expect(clientLogs.use_time).toEqual(
        DateUtils.diff(clientLogs.request_time, clientLogs.response_time, 'ms'),
      );
      expect(clientLogs.resp_code).toEqual(
        Constant.CUSTOM_RESPONSE_CODE.SUCCESS.toString(),
      );
      expect(clientLogs.resp_msg).toEqual(Constant.RESPONSE_MESSAGE.SUCCESS);
      expect(clientLogs.type).toEqual(ClientLogsTypes.IN);
      expect(clientLogs).toHaveProperty('params');
      expect(clientLogs).toHaveProperty('body');
      expect(clientLogs).toHaveProperty('query');
      expect(clientLogs.body).toEqual(body);
      expect(clientLogs.query).toEqual({ page: 1 });
      expect(clientLogs.params).toEqual({ id: '1' });
      expect(clientLogs.url).toEqual('/cats/create');
      expect(clientLogs.ip).toEqual('127.0.0.1');
      expect(clientLogs.http_method).toEqual('POST');
      expect(clientLogs.user_id).toEqual('none');
      expect(clientLogs.response).toEqual(body);
      expect(clientLogs.error_stack).toEqual('');
      expect(clientLogs).toHaveProperty('_id');
    });
  });
});
