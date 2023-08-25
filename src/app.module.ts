import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import mongoose from 'mongoose';
import { DatabaseModule } from './database/database.module';
import { CommonModule } from './common/common.module';
mongoose.set('debug', true);

@Module({
  imports: [
    DatabaseModule,
    CatsModule,
    CommonModule,
    // TODO: fix database error
    // ExternalModule,
  ],
})
export class AppModule {}
