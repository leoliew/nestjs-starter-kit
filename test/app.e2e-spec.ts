import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
// when e2e test is completed, stop the mongodb connection
import { mockModel } from './test-helper';

describe('AppController (e2e)', () => {
  console.log(mockModel.mockCat({}));
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/common/healthCheck')
      .expect(200)
      .expect('{"data":"ok","code":0,"message":"success"}');
  });
});
