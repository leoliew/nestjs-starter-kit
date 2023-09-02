import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('common')
@Controller('common')
export class CommonController {
  @Get('/healthCheck')
  async healthCheck() {
    return 'ok';
  }
}
