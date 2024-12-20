import { Test, TestingModule } from '@nestjs/testing';
import { OrderTrackingController } from './order_tracking.controller';
import { OrderTrackingService } from './order_tracking.service';

describe('OrderTrackingController', () => {
  let controller: OrderTrackingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderTrackingController],
      providers: [OrderTrackingService],
    }).compile();

    controller = module.get<OrderTrackingController>(OrderTrackingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
