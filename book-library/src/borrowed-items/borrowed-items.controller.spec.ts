import { Test, TestingModule } from '@nestjs/testing';
import { BorrowedItemsController } from './borrowed-items.controller';
import { BorrowedItemsService } from './borrowed-items.service';

describe('BorrowedItemsController', () => {
  let controller: BorrowedItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BorrowedItemsController],
      providers: [BorrowedItemsService],
    }).compile();

    controller = module.get<BorrowedItemsController>(BorrowedItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
