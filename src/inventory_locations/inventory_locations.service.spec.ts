import { Test, TestingModule } from '@nestjs/testing';
import { InventoryLocationsService } from './inventory_locations.service';

describe('InventoryLocationsService', () => {
  let service: InventoryLocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventoryLocationsService],
    }).compile();

    service = module.get<InventoryLocationsService>(InventoryLocationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
