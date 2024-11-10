import { Test, TestingModule } from '@nestjs/testing';
import { WishlistItemsController } from './wishlist_items.controller';
import { WishlistItemsService } from './wishlist_items.service';

describe('WishlistItemsController', () => {
  let controller: WishlistItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WishlistItemsController],
      providers: [WishlistItemsService],
    }).compile();

    controller = module.get<WishlistItemsController>(WishlistItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
