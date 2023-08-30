import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import mongoose from 'mongoose';
import { DatabaseModule } from './database/database.module';
import { CommonModule } from './common/common.module';
import { ExternalModule } from './external/external.module';
import * as config from 'config';

mongoose.set('debug', config.get('mongodb.debug'));

@Module({
  imports: [
    DatabaseModule,
    CatsModule,
    CommonModule,
    // TODO: fix database error
    ExternalModule,
  ],
})
export class AppModule {}
