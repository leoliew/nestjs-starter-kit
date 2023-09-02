import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientLogs, ClientLogsSchema } from './schemas/client-logs.schema';
import { Constant } from '../lib';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ValidationPipe } from './validation/validation.pipe';
import { CommonController } from './controllers/common.controller';
import { TokenGuard } from './guards/token.guard';
@Module({
  controllers: [CommonController],
  imports: [
    MongooseModule.forFeature(
      [{ name: ClientLogs.name, schema: ClientLogsSchema }],
      Constant.MONGODB.LOGS,
    ),
  ],
  providers: [
    TokenGuard,
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    { provide: APP_PIPE, useClass: ValidationPipe },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
  ],
  exports: [TokenGuard],
})
export class CommonModule {}
