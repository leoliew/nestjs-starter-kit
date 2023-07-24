import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import * as _ from 'lodash';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (!metadata.metatype || !ValidationPipe.toValidate(metadata.metatype)) {
      return value;
    }
    const object = plainToInstance(metadata.metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const msg = this.getMessage(errors[0]);
      throw new BadRequestException(msg);
    }
    return object;
  }

  private static toValidate(metaType): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metaType);
  }

  private getMessage(error: ValidationError) {
    let message: string;
    if (_.isEmpty(error.constraints)) {
      message = this.getMessage(error.children[0]);
    } else {
      const key = Object.keys(error.constraints)[0];
      message = error.constraints[key];
    }
    return message;
  }
}
