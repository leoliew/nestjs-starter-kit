import { Test, TestingModule } from '@nestjs/testing';
import { PaginateModel } from 'mongoose';
import { CatsService } from './cats.service';
import { Cats, CatsSchema } from './schemas/cats.schema';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Constant } from '../lib';
import { mockModel } from '../../test/test-helper';
import { DatabaseModule } from '../database/database.module';

describe('CatService', () => {
  let service: CatsService;
  let catModel: PaginateModel<Cats>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        MongooseModule.forFeature(
          [{ name: Cats.name, schema: CatsSchema }],
          Constant.MONGODB.MAIN,
        ),
      ],
      providers: [CatsService],
    }).compile();
    service = module.get(CatsService);
    catModel = module.get<PaginateModel<Cats>>(
      getModelToken('Cats', Constant.MONGODB.MAIN),
    );
  });

  it('defined', async () => {
    expect(service).toBeDefined();
  });

  it('findAll', async () => {
    const insertCats = mockModel.mockCat({});
    await catModel.create(insertCats);
    const cats = await service.findAll({ page: 1, limit: 10 });
    console.log(cats);
    expect(cats.docs[0].name).toEqual(insertCats.name);
  });

  it('create', async () => {
    const insertCat = mockModel.mockCat({});
    const newCat = await service.create({
      name: insertCat.name,
      age: insertCat.age,
      breed: insertCat.breed,
      is_kitten: insertCat.is_kitten,
    });
    expect(newCat.name).toEqual(insertCat.name);
    expect(newCat.age).toEqual(insertCat.age);
    expect(newCat.breed).toEqual(insertCat.breed);
    expect(newCat.is_kitten).toEqual(insertCat.is_kitten);
  });

  it('findById', async () => {
    const insertedCat = await catModel.create(
      mockModel.mockCat({ name: 'findById' }),
    );
    const cats = await service.findById(insertedCat.id);
    expect(cats.name).toEqual('findById');
  });
});
