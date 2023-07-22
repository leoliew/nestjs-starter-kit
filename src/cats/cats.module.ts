import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cats, CatsSchema } from './schemas/cats.schema';
import { Constant } from '../lib';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Cats.name, schema: CatsSchema }],
      Constant.MONGODB.MAIN,
    ),
  ],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
