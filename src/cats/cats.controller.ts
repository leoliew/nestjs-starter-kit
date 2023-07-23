import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cats } from './schemas/cats.schema';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('cats')
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cats[]> {
    return this.catsService.findAll();
  }

  @Get()
  async findById(id: string): Promise<Cats> {
    return this.catsService.findById(id);
  }

  @Post()
  async deleteById(id: string): Promise<Cats> {
    return this.catsService.deleteById(id);
  }
}
