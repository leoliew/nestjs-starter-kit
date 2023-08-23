import { Module } from '@nestjs/common';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientLogs, ClientLogsSchema } from './schemas/client-logs.schema';
import { Constant } from '../lib';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: ClientLogs.name, schema: ClientLogsSchema }],
      Constant.MONGODB.LOGS,
    ),
  ],
  providers: [AuthInterceptor, LoggingInterceptor],
  exports: [AuthInterceptor, LoggingInterceptor],
})
export class CommonModule {}
