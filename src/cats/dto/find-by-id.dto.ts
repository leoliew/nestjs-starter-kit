import { ApiProperty } from '@nestjs/swagger';
import { CatsEntity } from '../entities/cats.entity';

export class CatFindByIdRes extends CatsEntity {
  @ApiProperty({
    description: 'The id of the cat',
    example: '5f0f5f0f5f0f5f0f5f0f5f0f',
  })
  _id?: string;
}
