import { Module } from '@nestjs/common';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientLogs, ClientLogsSchema } from './schemas/client-logs.schema';
import { Constant } from '../lib';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ValidationPipe } from './validation/validation.pipe';
@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: ClientLogs.name, schema: ClientLogsSchema }],
      Constant.MONGODB.LOGS,
    ),
  ],
  providers: [
    AuthInterceptor,
    { provide: APP_INTERCEPTOR, useClass: HttpExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    { provide: APP_INTERCEPTOR, useClass: ValidationPipe },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
  ],
  exports: [AuthInterceptor],
})
export class CommonModule {}
