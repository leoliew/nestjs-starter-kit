import { ApiProperty } from '@nestjs/swagger';
import { PaginateRes } from '../../common/dto/crud.dto';
import { CatsEntity } from '../entities/cats.entity';

export class CatFindAllRes extends PaginateRes {
  @ApiProperty({
    type: CatsEntity,
    isArray: true,
  })
  docs: CatsEntity[];
}
