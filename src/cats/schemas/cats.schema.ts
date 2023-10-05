import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { Document } from 'mongoose';
import { Bcrypt } from '../../lib';

@Schema({
  collection: 'cats',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class Cats extends Document {
  @Prop({
    required: true,
    index: true,
    get: (value: string) => decrypt(value),
    set: (value: string) => encrypt(value),
  })
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;

  @Prop()
  is_kitten: boolean;
}

function encrypt(value: string) {
  if (!value) return value;
  return Bcrypt.encrypt({
    originData: value,
  });
}

function decrypt(value: string) {
  if (!value) return value;
  return Bcrypt.decrypt({
    originData: value,
  });
}

const CatsSchema = SchemaFactory.createForClass(Cats);

CatsSchema.plugin(mongoosePaginate);

// use mongooseEncryption package for encrypting fields
// var encKey = 'lYWkoReE0A/kxr4JYCW6AgnALU4oR9cyRtPaE1ICZQY=';
// var sigKey =
//   'wjEDYPpRIiRVvRquMWSbtyt0F3nQAT8wU/2HVjefxrXoDgGOnGbsgA2Ro7m8o9YXBsYtYR+igK+XDGvqxuvUBA==';
//
// CatsSchema.plugin(mongooseEncryption, {
//   encryptionKey: encKey,
//   signingKey: sigKey,
//   encryptedFields: ['name', 'age'],
// });

export { CatsSchema };
