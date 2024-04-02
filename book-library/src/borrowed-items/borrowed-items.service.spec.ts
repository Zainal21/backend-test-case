import { Test, TestingModule } from '@nestjs/testing';
import { BorrowedItemsService } from './borrowed-items.service';

describe('BorrowedItemsService', () => {
  let service: BorrowedItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BorrowedItemsService],
    }).compile();

    service = module.get<BorrowedItemsService>(BorrowedItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
