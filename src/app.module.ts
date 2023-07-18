import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';
import mongoose from 'mongoose';

mongoose.set('debug', true);

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/test'),
    CatsModule,
  ],
})
export class AppModule {}
