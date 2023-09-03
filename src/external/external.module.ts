import { Module } from '@nestjs/common';
import { Openai } from './openai';
import { Assembly } from './assembly';
import { Request } from './request';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestLogs, RequestLogsSchema } from './schemas/request-logs.schema';
import { Constant } from '../lib';
@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: RequestLogs.name, schema: RequestLogsSchema }],
      Constant.MONGODB.LOGS,
    ),
  ],
  providers: [Assembly, Openai, Request],
  exports: [Assembly, Openai],
})
export class ExternalModule {}
