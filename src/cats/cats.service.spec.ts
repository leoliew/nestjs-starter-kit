import { Test, TestingModule } from '@nestjs/testing';
import { PaginateModel, Types } from 'mongoose';
import { CatsService } from './cats.service';
import { Cats } from './schemas/cats.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Constant } from '../lib';
import { mockPagination } from '../../test/test-helper';

const mockCat = ({
  name = 'Cat #1',
  breed = 'Breed #1',
  age = 4,
  is_kitten = true,
}): Cats => ({
  name,
  age,
  breed,
  is_kitten,
});

describe('CatService', () => {
  let service: CatsService;
  let model: PaginateModel<Cats>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: getModelToken('Cats', Constant.MONGODB.MAIN),
          useValue: mockPagination(mockCat({})),
        },
      ],
    }).compile();
    service = module.get(CatsService);
    model = module.get<PaginateModel<Cats>>(
      getModelToken('Cats', Constant.MONGODB.MAIN),
    );
  });

  it('defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll', async () => {
    const catsArray = {
      docs: [mockCat({ name: 'hello' }), mockCat({})],
      totalDocs: 2,
      limit: 10,
      page: 1,
      totalPages: 1,
    };
    jest
      .spyOn(model, 'paginate')
      .mockImplementationOnce(() => Promise.resolve(catsArray as any));
    const cats = await service.findAll({ page: 1, limit: 10 });
    expect(cats.docs[0].name).toEqual('hello');
  });

  it('create', async () => {
    const newCat = await service.create(mockCat({}));
    expect(newCat.age).toEqual(mockCat({}).age);
  });

  it('findById', async () => {
    const cats = await service.findById(new Types.ObjectId().toString());
    expect(cats.age).toEqual(mockCat({}).age);
    expect(cats.name).toEqual(mockCat({}).name);
    expect(cats.breed).toEqual(mockCat({}).breed);
  });
});
