import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import mongoose from 'mongoose';
import { DatabaseModule } from './database/database.module';
import { CommonModule } from './common/common.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ClientLogs,
  ClientLogsSchema,
} from './common/schemas/client-logs.schema';
import { Constant } from './lib';
import { ExternalModule } from './external/external.module';

mongoose.set('debug', true);

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: ClientLogs.name, schema: ClientLogsSchema }],
      Constant.MONGODB.LOGS,
    ),
    DatabaseModule,
    CatsModule,
    CommonModule,
    ExternalModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
