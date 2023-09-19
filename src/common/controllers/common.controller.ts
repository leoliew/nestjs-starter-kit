import { Controller, Get, Res } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('common')
@Controller('common')
export class CommonController {
  @Get('/healthCheck')
  @ApiExcludeEndpoint()
  async healthCheck(@Res() res: Response): Promise<void> {
    res.send('ok');
  }
}
