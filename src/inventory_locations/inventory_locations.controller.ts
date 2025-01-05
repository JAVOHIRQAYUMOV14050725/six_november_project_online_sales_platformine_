// src/inventory_locations/inventory_locations.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InventoryLocationsService } from './inventory_locations.service';
import { CreateInventoryLocationDto } from './dto/create-inventory_location.dto';
import { UpdateInventoryLocationDto } from './dto/update-inventory_location.dto';

@Controller('inventory-locations')
export class InventoryLocationsController {
  constructor(private readonly inventoryLocationsService: InventoryLocationsService) { }

  @Post()
  create(@Body() createInventoryLocationDto: CreateInventoryLocationDto) {
    return this.inventoryLocationsService.create(createInventoryLocationDto);
  }

  @Get()
  findAll() {
    return this.inventoryLocationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoryLocationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInventoryLocationDto: UpdateInventoryLocationDto) {
    return this.inventoryLocationsService.update(+id, updateInventoryLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoryLocationsService.remove(+id);
  }
}
