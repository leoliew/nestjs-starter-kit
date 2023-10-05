import {
  ArgumentMetadata,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { ValidationPipe } from './validation.pipe';
import { CatCreateDto } from '../../cats/dto/create.dto';

describe('Validation Pipe', () => {
  let pipe: ValidationPipe;

  beforeEach(() => {
    pipe = new ValidationPipe();
  });

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  it('should transform and validate the value', async () => {
    // 模拟值和元数据
    const value = {
      name: 'John',
      age: 25,
    };
    const metadata: ArgumentMetadata = {
      type: 'body',
    } as any;
    const transformedValue = await pipe.transform(value, metadata);
    expect(transformedValue).toEqual(value);
    expect(() => pipe.transform(value, metadata)).not.toThrow();
  });

  it('should throw BadRequestException for invalid value', async () => {
    const value = {
      name: '',
      age: 1,
      breed: 'Persian',
      is_kitten: true,
    };
    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: CatCreateDto,
      data: '',
    } as any;
    await pipe.transform(value, metadata).catch((err) => {
      const response = err.getResponse();
      expect(response.message).toEqual('name should not be empty');
      expect(response.error).toEqual('Bad Request');
      expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
    });
    await expect(pipe.transform(value, metadata)).rejects.toThrow(
      BadRequestException,
    );
  });
});
