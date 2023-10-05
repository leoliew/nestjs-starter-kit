import { Injectable } from '@nestjs/common';
import { PaginateModel } from 'mongoose';
import { Cats } from './schemas/cats.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Constant } from '../lib';
import * as _ from 'lodash';
import { CatCreateDto } from './dto/create.dto';
import { ByIdDto, PaginateDto } from '../common/dto/crud.dto';
import { CatUpdateByIdDto } from './dto/update-by-id.dto';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel('Cats', Constant.MONGODB.MAIN)
    private readonly catsModel: PaginateModel<Cats>,
  ) {}

  async create(createCatDto: CatCreateDto): Promise<Cats> {
    return await this.catsModel.create(createCatDto);
  }

  async findAll(paginateDto: PaginateDto): Promise<any> {
    return await this.catsModel.paginate({}, paginateDto);
  }

  async findById(id: string): Promise<Cats> {
    return await this.catsModel.findById(id).exec();
  }

  async updateOne(updateCatDto: CatUpdateByIdDto) {
    const updateData = _.omit(updateCatDto, ['_id']);
    return await this.catsModel
      .findByIdAndUpdate(updateCatDto._id, updateData, {
        new: true,
      })
      .exec();
  }

  async deleteById(byIdDto: ByIdDto): Promise<Cats> {
    return await this.catsModel.findByIdAndDelete(byIdDto._id).exec();
  }
}
