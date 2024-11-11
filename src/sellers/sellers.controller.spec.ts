import { Test, TestingModule } from '@nestjs/testing';
import { SellerController } from './sellers.controller';
import { SellerService } from './sellers.service';

describe('SellersController', () => {
  let controller: SellerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SellerController],
      providers: [SellerService],
    }).compile();

    controller = module.get<SellerController>(SellerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
