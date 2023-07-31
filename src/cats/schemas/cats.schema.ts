import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import * as mongooseEncryption from 'mongoose-encryption';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { timestamp } from 'rxjs';

export type CatsDocument = HydratedDocument<Cats>;

@Schema({
  collection: 'cats',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class Cats {
  @Prop({ required: true, index: true })
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

const CatsSchema = SchemaFactory.createForClass(Cats);

CatsSchema.plugin(mongoosePaginate);

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
