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
import { TokenGuard } from '../common/guards/token.guard';
import { CatCreateDto } from './dto/create.dto';
import {
  ByIdDto,
  DeletedRes,
  PaginateDto,
  UpdatedRes,
} from '../common/dto/crud.dto';
import { CatFindAllRes } from './dto/find-all.dto';
import { CatUpdateByIdDto } from './dto/update-by-id.dto';
import { CatFindByIdRes } from './dto/find-by-id.dto';

@ApiTags('cats')
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post('create')
  @ApiOperation({ summary: 'create cat' })
  @ApiResponse({
    status: 200,
    description: 'The cat has been successfully created.',
    type: CatCreateDto,
  })
  async create(@Body() createDto: CatCreateDto) {
    return this.catsService.create(createDto);
  }

  @Get('findAll')
  @ApiOperation({ summary: 'find all cats' })
  @ApiResponse({
    status: 200,
    description: 'The cats has been successfully returned.',
    type: CatFindAllRes,
  })
  async findAll(@Query() paginateDto: PaginateDto): Promise<CatFindAllRes> {
    return this.catsService.findAll(paginateDto);
  }

  @Get('findById')
  @ApiResponse({
    status: 200,
    description: 'The cat has been successfully returned.',
    type: CatFindByIdRes,
  })
  @ApiOperation({ summary: 'find cat by id' })
  async findById(@Query() byIdDto: ByIdDto): Promise<CatFindByIdRes> {
    return this.catsService.findById(byIdDto._id);
  }

  @Post('updateById')
  @ApiResponse({
    status: 200,
    description: 'The cat has been successfully updated.',
    type: UpdatedRes,
  })
  @ApiOperation({ summary: 'update cats by id' })
  async updateById(@Body() updateByIdDto: CatUpdateByIdDto): Promise<Cats> {
    return this.catsService.updateOne(updateByIdDto);
  }

  @UseGuards(TokenGuard)
  @ApiBearerAuth('token')
  @Post('deleteById')
  @ApiResponse({
    status: 200,
    description: 'The cat has been successfully deleted.',
    type: DeletedRes,
  })
  @ApiOperation({ summary: 'delete cat by id' })
  async deleteById(
    @Req() req: any,
    @Body() reqByIdDto: ByIdDto,
  ): Promise<Cats> {
    // should get user info from request context
    Logger.log('user', req.user);
    return this.catsService.deleteById(reqByIdDto);
  }

  @Get('streamText')
  @ApiProduces('text/plain')
  @ApiOperation({ summary: 'stream text sample ', deprecated: true })
  async getSlowText(@Res() res: Response) {
    const text =
      'This is a sample text. This is a sample text. This is a sample text.';
    const delay = 100; // set delay to 100ms
    // set header
    res.setHeader('Content-Type', 'text/plain');
    // write text to response
    for (let i = 0; i < text.length; i++) {
      const char = text.charAt(i);
      res.write(char);
      await delayAsync(delay);
    }
    // end response
    res.end();
  }
}

function delayAsync(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
