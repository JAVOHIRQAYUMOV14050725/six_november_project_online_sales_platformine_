import { Test, TestingModule } from '@nestjs/testing';
import { InventoryLocationsController } from './inventory_locations.controller';
import { InventoryLocationsService } from './inventory_locations.service';

describe('InventoryLocationsController', () => {
  let controller: InventoryLocationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventoryLocationsController],
      providers: [InventoryLocationsService],
    }).compile();

    controller = module.get<InventoryLocationsController>(InventoryLocationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
