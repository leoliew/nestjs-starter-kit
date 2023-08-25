import { Module } from '@nestjs/common';
import { OpenAIProxy } from './openai.proxy';
import { AssemblyProxy } from './assembly.proxy';
import { Request } from './request';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpLogs, HttpLogsSchema } from './schemas/http-logs.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HttpLogs.name, schema: HttpLogsSchema },
    ]),
  ],
  providers: [AssemblyProxy, OpenAIProxy, Request],
  exports: [AssemblyProxy, OpenAIProxy],
})
export class ExternalModule {}
