import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCatDto {
  @ApiProperty({ required: true, default: 'Custard' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ default: 1 })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  readonly age: number;

  @ApiProperty({ default: 'Persian' })
  readonly breed: string;

  @ApiProperty({ default: true })
  @Type(() => Boolean)
  @IsOptional()
  @IsBoolean()
  readonly is_kitten: boolean;
}

export class UpdateCatDto extends CreateCatDto {
  @ApiProperty({ required: true, default: '64b3d98a6004d4c1fd92a0ce' })
  @IsNotEmpty()
  readonly _id: string;

  @ApiProperty({ required: false, default: 'Custard' })
  @IsOptional()
  readonly name: string;
}
