import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Res,
  UseGuards,
  Req,
  Logger,
} from '@nestjs/common';
import { CreateCatDto, UpdateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cats } from './schemas/cats.schema';
import { Response } from 'express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiProduces,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  ReqByIdDto,
  ReqPaginateDto,
  RespPaginateDto,
} from '../common/dto/crud.dto';
import { TokenGuard } from '../common/guards/token.guard';

@ApiTags('cats')
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post('create')
  @ApiOperation({ summary: 'create cat' })
  @ApiResponse({
    status: 200,
    description: 'The cat has been successfully created.',
    type: CreateCatDto,
  })
  async create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get('findAll')
  @ApiOperation({ summary: 'find all cats' })
  @ApiResponse({
    status: 200,
    description: 'The cats has been successfully returned.',
    type: RespPaginateDto,
  })
  async findAll(@Query() reqPaginateDto: ReqPaginateDto): Promise<Cats[]> {
    return this.catsService.findAll(reqPaginateDto);
  }

  @Get('findById')
  @ApiResponse({
    status: 200,
    description: 'The cat has been successfully returned.',
    type: CreateCatDto,
  })
  @ApiOperation({ summary: 'find cat by id' })
  async findById(@Query() reqByIdDto: ReqByIdDto): Promise<Cats> {
    return this.catsService.findById(reqByIdDto._id);
  }

  @Post('update')
  @ApiResponse({
    status: 200,
    description: 'The cat has been successfully updated.',
    type: CreateCatDto,
  })
  @ApiOperation({ summary: 'update cat' })
  async update(@Body() updateCatDto: UpdateCatDto): Promise<Cats> {
    return this.catsService.updateOne(updateCatDto);
  }

  @UseGuards(TokenGuard)
  @ApiBearerAuth('token')
  @Post('deleteById')
  @ApiResponse({
    status: 200,
    description: 'The cat has been successfully deleted.',
    type: CreateCatDto,
  })
  @ApiOperation({ summary: 'delete cat by id' })
  async deleteById(
    @Req() req: any,
    @Body() reqByIdDto: ReqByIdDto,
  ): Promise<Cats> {
    // should get user info from request context
    Logger.log('user', req.user);
    return this.catsService.deleteById(reqByIdDto._id);
  }

  @Get('streamText')
  @ApiProduces('text/plain')
  async getSlowText(@Res() res: Response) {
    const text =
      'This is a sample text. This is a sample text. This is a sample text.';
    const delay = 100; // 延迟时间，单位为毫秒
    // 设置响应头，指定内容类型
    res.setHeader('Content-Type', 'text/plain');
    // 将文本逐步写入响应
    for (let i = 0; i < text.length; i++) {
      const char = text.charAt(i);
      res.write(char);
      await delayAsync(delay);
    }
    // 结束响应
    res.end();
  }
}

function delayAsync(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
