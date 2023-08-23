import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum ClientLogsTypes {
  IN = 'in',
  OUT = 'out',
}

@Schema({
  collection: 'client_logs',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class ClientLogs extends Document {
  @Prop({ type: String, comment: 'Request ID' })
  request_id!: string;

  @Prop({ type: String, comment: 'User ID' })
  user_id!: string;

  @Prop({
    type: String,
    default: ClientLogsTypes.IN,
    enum: Object.values(ClientLogsTypes),
    comment: 'Type: request other system (out) or receive other request (in)',
  })
  type!: string;

  @Prop({ type: Date, comment: 'Request time' })
  request_time!: Date;

  @Prop({ type: Date, comment: 'Response time' })
  response_time!: Date;

  @Prop({ type: String, comment: 'Response code' })
  ret_code!: string;

  @Prop({
    type: String,
    comment: 'Response message, usually present in case of errors',
  })
  ret_msg!: string;

  @Prop({ type: Number, comment: 'Request duration in milliseconds' })
  use_time!: number;

  @Prop({ type: String, comment: 'Request method' })
  http_method!: string;

  @Prop({ type: String, index: true, comment: 'Request URL' })
  url!: string;

  @Prop({ type: Object, comment: 'Request parameters passed via URL' })
  query!: Record<string, any>;

  @Prop({ type: Object, comment: 'Request parameters passed via POST body' })
  body!: Record<string, any>;

  @Prop({ type: Object, comment: 'Integrated request parameters' })
  params!: Record<string, any>;

  @Prop({ type: Object, comment: 'Response result' })
  response!: Record<string, any>;

  @Prop({ type: String, comment: 'Error stack trace' })
  error_stack!: string;

  @Prop({ type: String, comment: 'Error message' })
  error_message!: string;
}

export const ClientLogsSchema = SchemaFactory.createForClass(ClientLogs);
