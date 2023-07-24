import { Injectable } from '@nestjs/common';
import { PaginateModel } from 'mongoose';
import { CreateCatDto, UpdateCatDto } from './dto/create-cat.dto';
import { Cats } from './schemas/cats.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Constant } from '../lib';
import * as _ from 'lodash';
import { ReqPaginateDto } from '../common/dto/crud.dto';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel('Cats', Constant.MONGODB.MAIN)
    private readonly catsModel: PaginateModel<Cats>,
  ) {}

  async create(createCatDto: CreateCatDto): Promise<Cats> {
    return await this.catsModel.create(createCatDto);
  }

  async findAll(reqPaginateDto: ReqPaginateDto): Promise<any> {
    return await this.catsModel.paginate({}, reqPaginateDto);
  }

  async findById(id: string): Promise<Cats> {
    return await this.catsModel.findById(id).exec();
  }

  async updateOne(updateCatDto: UpdateCatDto) {
    const updateData = _.omit(updateCatDto, ['_id']);
    return await this.catsModel
      .findByIdAndUpdate(updateCatDto._id, updateData, {
        new: true,
      })
      .exec();
  }

  async deleteById(id: string): Promise<Cats> {
    return await this.catsModel.findByIdAndDelete(id).exec();
  }
}
