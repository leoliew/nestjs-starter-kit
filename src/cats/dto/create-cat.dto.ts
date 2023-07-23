import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class CreateCatDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly age: number;

  @ApiProperty()
  readonly breed: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  readonly is_kitten: boolean;
}

export class UpdateCatDto {
  @ApiProperty({ required: true })
  readonly _id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly age: number;

  @ApiProperty()
  readonly breed: string;

  @ApiProperty()
  readonly is_kitten: boolean;
}
