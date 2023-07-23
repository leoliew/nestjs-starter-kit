import { Module } from '@nestjs/common';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@Module({
  imports: [],
  providers: [AuthInterceptor],
  exports: [AuthInterceptor],
})
export class CommonModule {}
