import { Test, TestingModule } from '@nestjs/testing';
import { PaymentStatusesService } from './payment_statuses.service';

describe('PaymentStatusesService', () => {
  let service: PaymentStatusesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentStatusesService],
    }).compile();

    service = module.get<PaymentStatusesService>(PaymentStatusesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
