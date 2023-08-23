import { Module } from '@nestjs/common';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientLogs, ClientLogsSchema } from './schemas/client-logs.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ClientLogs.name, schema: ClientLogsSchema },
    ]),
  ],
  providers: [AuthInterceptor],
  exports: [AuthInterceptor],
})
export class CommonModule {}
