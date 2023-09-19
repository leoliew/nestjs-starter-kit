import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class ByIdDto {
  @ApiProperty({ required: true, default: '64b3d98a6004d4c1fd92a0ce' })
  @IsNotEmpty()
  _id: string;
}
export class PaginateDto {
  @ApiProperty({ default: 1 })
  @Type(() => Number)
  @IsNumber()
  page: number;

  @ApiProperty({ default: 10 })
  @Type(() => Number)
  @IsNumber()
  limit: number;
}
export class PaginateRes {
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

export class UpdatedRes {
  @ApiProperty()
  acknowledged: boolean;
  @ApiProperty()
  modifiedCount: number;
  @ApiProperty()
  upsertedCount: number;
  @ApiProperty()
  matchedCount: number;
}

export class DeletedRes {
  @ApiProperty()
  acknowledged: boolean;
  @ApiProperty()
  deletedCount: number;
}
