import mongoose, { Types } from 'mongoose';
import { Cats } from '../src/cats/schemas/cats.schema';

// we need to drop database after each test,
// and after each can get the database connection
afterEach(async () => {
  for (const conn of mongoose.connections) {
    if (conn.db) {
      await conn.db.dropDatabase();
    }
  }
  jest.clearAllMocks();
});

afterAll(async () => {
  await mongoose.disconnect();
});

const jestPagination = (mockModel: any) => {
  return {
    new: jest.fn().mockResolvedValue(mockModel),
    constructor: jest.fn().mockResolvedValue(mockModel),
    find: jest.fn(),
    create: jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockModel as any)),
    save: jest.fn(),
    exec: jest.fn(),
    paginate: jest.fn().mockImplementation(() =>
      Promise.resolve({
        docs: [mockModel, mockModel],
        totalDocs: 2,
        limit: 10,
        page: 1,
        totalPages: 1,
      }),
    ),
    findOne: jest.fn().mockImplementation(() =>
      Promise.resolve({
        _id: new Types.ObjectId(),
        created_at: new Date(),
        updated_at: new Date(),
        ...mockModel,
      }),
    ),
    findById: jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockResolvedValueOnce({
        _id: new Types.ObjectId(),
        created_at: new Date(),
        updated_at: new Date(),
        ...mockModel,
      }),
    })),
  };
};

const jestMongoose = (mockModel: any) => {
  return {
    new: jest.fn().mockResolvedValue(mockModel),
    constructor: jest.fn().mockResolvedValue(mockModel),
    find: jest.fn(),
    create: jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockModel as any)),
    save: jest.fn(),
    exec: jest.fn(),
    findById: jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockResolvedValueOnce({
        _id: new Types.ObjectId(),
        created_at: new Date(),
        updated_at: new Date(),
        ...mockModel,
      }),
    })),
  };
};

const mockModel = {
  mockCat(mock?: Partial<Cats>): Partial<Cats> {
    return {
      // _id: mock?._id || new Types.ObjectId(),
      name: mock?.name || 'Ventus',
      age: mock?.age || 4,
      breed: mock?.breed || 'Russian Blue',
      is_kitten: mock?.is_kitten || false,
    };
  },
};

export { jestMongoose, jestPagination, mockModel };
