import { Test, TestingModule } from '@nestjs/testing';
import { TrackingStatusesService } from './tracking_statuses.service';

describe('TrackingStatusesService', () => {
  let service: TrackingStatusesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrackingStatusesService],
    }).compile();

    service = module.get<TrackingStatusesService>(TrackingStatusesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
