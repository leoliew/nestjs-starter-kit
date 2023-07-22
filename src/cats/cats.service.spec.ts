import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { CatsService } from './cats.service';
import { Cats } from './schemas/cats.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Constant } from '../lib';

const mockCat = {
  name: 'Cat #1',
  breed: 'Breed #1',
  age: 4,
};

const catsArray = [
  {
    name: 'Cat #1',
    breed: 'Breed #1',
    age: 4,
  },
  {
    name: 'Cat #2',
    breed: 'Breed #2',
    age: 2,
  },
];

describe('CatService', () => {
  let service: CatsService;
  let model: Model<Cats>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: getModelToken('Cats', Constant.MONGODB.MAIN),
          useValue: {
            new: jest.fn().mockResolvedValue(mockCat),
            constructor: jest.fn().mockResolvedValue(mockCat),
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();
    console.log(getModelToken('Cats', Constant.MONGODB.MAIN));
    service = module.get(CatsService);
    model = module.get<Model<Cats>>(
      getModelToken('Cats', Constant.MONGODB.MAIN),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all cats', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(catsArray),
    } as any);
    const cats = await service.findAll();
    expect(cats).toEqual(catsArray);
  });

  it('should insert a new cat', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        name: 'Cat #1',
        breed: 'Breed #1',
        age: 4,
      } as any),
    );
    const newCat = await service.create({
      is_kitten: false,
      name: 'Cat #1',
      breed: 'Breed #1',
      age: 4,
    });
    expect(newCat).toEqual(mockCat);
  });
});
