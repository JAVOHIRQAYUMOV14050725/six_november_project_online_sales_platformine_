import { Test, TestingModule } from '@nestjs/testing';
import { TrackingStatusesController } from './tracking_statuses.controller';
import { TrackingStatusesService } from './tracking_statuses.service';

describe('TrackingStatusesController', () => {
  let controller: TrackingStatusesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrackingStatusesController],
      providers: [TrackingStatusesService],
    }).compile();

    controller = module.get<TrackingStatusesController>(TrackingStatusesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
