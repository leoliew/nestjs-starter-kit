import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum HttpLogStatus {
  PENDING = 'pending',
  ERROR = 'error',
  FINISH = 'finish',
}

@Schema({
  collection: 'http_logs',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class HttpLogs extends Document {
  @Prop({ required: true, index: true, comment: 'request url' })
  url: string;

  @Prop({ comment: 'request time' })
  request_time: Date;

  @Prop({ comment: 'response time' })
  response_time: Date;

  @Prop({ index: true, comment: '请求耗时 ms' })
  use_time: number;

  @Prop({
    type: String,
    required: true,
    index: true,
    default: HttpLogStatus.PENDING,
    enum: Object.values(HttpLogStatus),
    comment: '状态',
  })
  status: HttpLogStatus;

  @Prop({ index: true, comment: 'http service name' })
  service: string;

  @Prop({ comment: 'http method' })
  method: string;

  @Prop({ comment: 'request query', type: Object })
  query: object;

  @Prop({ comment: 'request headers', type: Object })
  headers: object;

  // @Prop({ comment: 'is form type' })
  // isForm: boolean;

  @Prop({ comment: 'request body', type: Object })
  body: object;

  @Prop({ comment: 'response', type: Object })
  response: object;
}

export const HttpLogsSchema = SchemaFactory.createForClass(HttpLogs);
