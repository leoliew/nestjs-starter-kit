import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CreateCatDto, UpdateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cats } from './schemas/cats.schema';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  ReqByIdDto,
  ReqPaginateDto,
  RespPaginateDto,
} from '../common/dto/crud.dto';
import { AuthInterceptor } from '../common/interceptors/auth.interceptor';

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

  @UseInterceptors(AuthInterceptor)
  @ApiBearerAuth('token')
  @Post('deleteById')
  @ApiResponse({
    status: 200,
    description: 'The cat has been successfully deleted.',
    type: CreateCatDto,
  })
  @ApiOperation({ summary: 'delete cat by id' })
  async deleteById(@Body() reqByIdDto: ReqByIdDto): Promise<Cats> {
    return this.catsService.deleteById(reqByIdDto._id);
  }
}
