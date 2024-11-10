import { Injectable } from '@nestjs/common';
import { CreateInventoryLocationDto } from './dto/create-inventory_location.dto';
import { UpdateInventoryLocationDto } from './dto/update-inventory_location.dto';

@Injectable()
export class InventoryLocationsService {
  create(createInventoryLocationDto: CreateInventoryLocationDto) {
    return 'This action adds a new inventoryLocation';
  }

  findAll() {
    return `This action returns all inventoryLocations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inventoryLocation`;
  }

  update(id: number, updateInventoryLocationDto: UpdateInventoryLocationDto) {
    return `This action updates a #${id} inventoryLocation`;
  }

  remove(id: number) {
    return `This action removes a #${id} inventoryLocation`;
  }
}
