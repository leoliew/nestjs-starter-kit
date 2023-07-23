import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum ProxyLogStatus {
  PENDING = 'pending',
  ERROR = 'error',
  FINISH = 'finish',
}

@Schema({
  collection: 'proxy_logs',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class ProxyLogs extends Document {
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
    default: ProxyLogStatus.PENDING,
    enum: Object.values(ProxyLogStatus),
    comment: '状态',
  })
  status: ProxyLogStatus;

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

export const ProxyLogsSchema = SchemaFactory.createForClass(ProxyLogs);
