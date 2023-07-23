import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class ReqByIdDto {
  @ApiProperty({ required: true, default: '64b3d98a6004d4c1fd92a0ce' })
  @IsNotEmpty()
  _id: string;
}
export class ReqPaginateDto {
  @ApiProperty({ default: 1 })
  @Type(() => Number)
  @IsNumber()
  page: number;

  @ApiProperty({ default: 10 })
  @Type(() => Number)
  @IsNumber()
  limit: number;
}
export class RespPaginateDto {
  @ApiProperty()
  totalDocs: number;
  @ApiProperty()
  limit: number;
  @ApiProperty()
  totalPages: number;
  @ApiProperty()
  page: number;
  @ApiProperty()
  pagingCounter: number;
  @ApiProperty()
  hasPrevPage: boolean;
  @ApiProperty()
  hasNextPage: boolean;
  @ApiProperty()
  prevPage: number;
  @ApiProperty()
  nextPage: number;
}

export class MongooseUpdatedDto {
  @ApiProperty()
  acknowledged: boolean;
  @ApiProperty()
  modifiedCount: number;
  @ApiProperty()
  upsertedId: null;
  @ApiProperty()
  upsertedCount: number;
  @ApiProperty()
  matchedCount: number;
}

export class MongooseDeletedDto {
  @ApiProperty()
  acknowledged: boolean;
  @ApiProperty()
  deletedCount: number;
}
