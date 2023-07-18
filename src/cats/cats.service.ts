import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cats } from './schemas/cats.schema';

@Injectable()
export class CatsService {
  constructor(@Inject('CatsModel') private readonly catModel: Model<Cats>) {}

  async create(createCatDto: CreateCatDto): Promise<Cats> {
    const createdCat = await this.catModel.create(createCatDto);
    return createdCat;
  }

  async findAll(): Promise<Cats[]> {
    return await this.catModel.find().exec();
  }
}
