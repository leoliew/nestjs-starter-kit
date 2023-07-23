import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cats } from './schemas/cats.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Constant } from '../lib';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel('Cats', Constant.MONGODB.MAIN)
    private readonly catsModel: Model<Cats>,
  ) {}

  async create(createCatDto: CreateCatDto): Promise<Cats> {
    const createdCat = await this.catsModel.create(createCatDto);
    return createdCat;
  }

  async findAll(): Promise<Cats[]> {
    return await this.catsModel.find().exec();
  }

  async findById(id: string): Promise<Cats> {
    return await this.catsModel.findById(id).exec();
  }

  // async update(
  //   id: string,
  //   createCatDto: CreateCatDto,
  // ): {
  //   // return aw
  // };

  async deleteById(id: string): Promise<Cats> {
    return await this.catsModel.findByIdAndDelete(id).exec();
  }
}
