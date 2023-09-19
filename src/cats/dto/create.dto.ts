import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CatCreateDto {
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
