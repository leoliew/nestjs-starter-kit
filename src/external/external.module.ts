import { Module } from '@nestjs/common';
import { OpenAIProxy } from './openai.proxy';
import { AssemblyProxy } from './assembly.proxy';
import { Request } from './request';
import { MongooseModule } from '@nestjs/mongoose';
import { ProxyLogs, ProxyLogsSchema } from './schemas/proxy-logs.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProxyLogs.name, schema: ProxyLogsSchema },
    ]),
  ],
  providers: [AssemblyProxy, OpenAIProxy, Request],
  exports: [AssemblyProxy, OpenAIProxy],
})
export class ExternalModule {}
