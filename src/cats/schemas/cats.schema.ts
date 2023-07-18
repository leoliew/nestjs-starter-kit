import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongooseEncryption from 'mongoose-encryption';
import { timestamp } from 'rxjs';

export type CatDocument = HydratedDocument<Cats>;

@Schema({ collection: 'cat', timestamps: true })
export class Cats {
  @Prop()
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

var encKey = 'lYWkoReE0A/kxr4JYCW6AgnALU4oR9cyRtPaE1ICZQY=';
var sigKey =
  'wjEDYPpRIiRVvRquMWSbtyt0F3nQAT8wU/2HVjefxrXoDgGOnGbsgA2Ro7m8o9YXBsYtYR+igK+XDGvqxuvUBA==';

CatsSchema.plugin(mongooseEncryption, {
  encryptionKey: encKey,
  signingKey: sigKey,
  encryptedFields: ['name', 'age'],
});

export { CatsSchema };
