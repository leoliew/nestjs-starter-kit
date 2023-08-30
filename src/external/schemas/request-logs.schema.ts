import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum RequestLogStatus {
  PENDING = 'pending',
  ERROR = 'error',
  FINISH = 'finish',
}

@Schema({
  collection: 'request_logs',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class RequestLogs extends Document {
  @Prop({ required: true, index: true, comment: 'request url' })
  url: string;

  // according to your business
  @Prop({ comment: 'identifier', type: Object })
  identifier: {
    user_id: string;
    scribe_id: string;
  };

  @Prop({ comment: 'request time' })
  request_time: Date;

  @Prop({ comment: 'response time' })
  response_time: Date;

  @Prop({ comment: '请求耗时 ms' })
  use_time: number;

  @Prop({
    type: String,
    required: true,
    default: RequestLogStatus.PENDING,
    enum: Object.values(RequestLogStatus),
    comment: '状态',
  })
  status: RequestLogStatus;

  @Prop({ comment: 'http service name' })
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

  @Prop({ comment: 'error message', type: String })
  error_msg: string;
}

export const RequestLogsSchema = SchemaFactory.createForClass(RequestLogs);
