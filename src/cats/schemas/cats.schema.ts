import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import * as mongooseEncryption from 'mongoose-encryption';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { timestamp } from 'rxjs';
import { Bcrypt } from '../../lib';

export type CatsDocument = HydratedDocument<Cats>;

@Schema({
  collection: 'cats',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class Cats {
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

  @Prop({ type: timestamp })
  timestamps: {
    createdAt: 'created_at';
    updatedAt: 'updated_at';
  };
}

function encrypt(value: string) {
  if (!value) return value;
  return Bcrypt.encrypt(value);
}

function decrypt(value: string) {
  if (!value) return value;
  return Bcrypt.decrypt(value);
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
