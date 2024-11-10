import { Test, TestingModule } from '@nestjs/testing';
import { PaymentStatusesController } from './payment_statuses.controller';
import { PaymentStatusesService } from './payment_statuses.service';

describe('PaymentStatusesController', () => {
  let controller: PaymentStatusesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentStatusesController],
      providers: [PaymentStatusesService],
    }).compile();

    controller = module.get<PaymentStatusesController>(PaymentStatusesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
