import { ApiProperty } from '@nestjs/swagger';

export class CatsEntity {
  @ApiProperty({
    description: 'The name of the cat',
    example: 'Whiskers',
  })
  name: string;

  @ApiProperty({
    description: 'The age of the cat',
    example: 3,
  })
  age: number;

  @ApiProperty({
    description: 'The breed of the cat',
    example: 'Persian',
  })
  breed: string;

  @ApiProperty({
    description: 'Indicates if the cat is a kitten',
    example: true,
  })
  is_kitten: boolean;
}
