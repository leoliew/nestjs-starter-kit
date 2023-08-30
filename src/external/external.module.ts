import { Module } from '@nestjs/common';
import { OpenAIProxy } from './openai.proxy';
import { AssemblyProxy } from './assembly.proxy';
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
  providers: [AssemblyProxy, OpenAIProxy, Request],
  exports: [AssemblyProxy, OpenAIProxy],
})
export class ExternalModule {}
