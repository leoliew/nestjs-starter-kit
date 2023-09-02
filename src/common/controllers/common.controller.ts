import { Controller, Get, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('common')
@Controller('common')
export class CommonController {
  @Get('/healthCheck')
  async healthCheck(@Res() res: Response): Promise<void> {
    res.send('ok');
  }
}
