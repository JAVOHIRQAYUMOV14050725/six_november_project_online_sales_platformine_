import { Module } from '@nestjs/common';
import { InventoryLocationsService } from './inventory_locations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryLocationsController } from './inventory_locations.controller';
import { InventoryLocation } from './entities/inventory_location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryLocation])],
  controllers: [InventoryLocationsController],
  providers: [InventoryLocationsService],
})
export class InventoryLocationsModule {}
