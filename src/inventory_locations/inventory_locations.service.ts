import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInventoryLocationDto } from './dto/create-inventory_location.dto';
import { UpdateInventoryLocationDto } from './dto/update-inventory_location.dto';
import { InventoryLocation } from './entities/inventory_location.entity';

@Injectable()
export class InventoryLocationsService {
  constructor(
    @InjectRepository(InventoryLocation)
    private readonly inventoryLocationRepository: Repository<InventoryLocation>,
  ) { }

  async create(createInventoryLocationDto: CreateInventoryLocationDto): Promise<InventoryLocation> {
    const location = this.inventoryLocationRepository.create(createInventoryLocationDto);
    return this.inventoryLocationRepository.save(location);
  }

  async findAll(): Promise<InventoryLocation[]> {
    return this.inventoryLocationRepository.find();
  }

  async findOne(id: number): Promise<{ id: number }[]> {
    const locations = await this.inventoryLocationRepository.find({
      where: { id },
      select: ['id'], 
    });
    if (locations.length === 0) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }
    return locations; 
  }

  async update(id: number, updateInventoryLocationDto: UpdateInventoryLocationDto): Promise<InventoryLocation> {
    const location = await this.inventoryLocationRepository.findOne({
      where: { id },
    });
    if (!location) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }

    Object.assign(location, updateInventoryLocationDto);
    return this.inventoryLocationRepository.save(location);
  }

  async remove(id: number): Promise<void> {
    const location = await this.inventoryLocationRepository.findOne({
      where: { id },
    });
    if (!location) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }

    await this.inventoryLocationRepository.remove(location);
  }
}
