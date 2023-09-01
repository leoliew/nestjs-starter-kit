import { Types } from 'mongoose';

const mockPagination = (mockModel: any) => {
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

export { mockPagination };
