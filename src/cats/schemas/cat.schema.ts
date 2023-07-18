import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {timestamp} from "rxjs";

export type CatDocument = HydratedDocument<Cat>;

@Schema({collection: 'cat',timestamps:true})
export class Cat {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;

  @Prop({type:timestamp})
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
}

export const CatSchema = SchemaFactory.createForClass(Cat);
