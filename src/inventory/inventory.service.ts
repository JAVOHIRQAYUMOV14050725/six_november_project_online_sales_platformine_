import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Inventory } from './entities/inventory.entity';
import { Product } from 'src/products/entities/product.entity';
import { InventoryLocation } from 'src/inventory_locations/entities/inventory_location.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(InventoryLocation)
    private readonly locationRepository: Repository<InventoryLocation>
  ) { }

  // Create a new inventory record
  async create(createInventoryDto: CreateInventoryDto): Promise<Inventory | { message: string; products?: any[]; locations?: any[] }> {
    const { product_id, quantity, location_id } = createInventoryDto;

    const product = await this.productRepository.findOne({
      where: { id: product_id },
    });

    if (!product) {
      const products = await this.productRepository.find();
      return {
        message: `Product with ID ${product_id} not found. Here are the available products:`,
        products: products.map(p => ({ id: p.id, name: p.name }))
      };
    }

    const location = await this.locationRepository.findOne({
      where: { id: location_id },
    });

    if (!location) {
      const locations = await this.locationRepository.find();
      return {
        message: `Location with ID ${location_id} not found. Here are the available locations:`,
        locations: locations.map(l => ({ id: l.id, location: l.location }))
      };
    }

    const newInventory = this.inventoryRepository.create({
      product,
      quantity,
      location,
    });

    return this.inventoryRepository.save(newInventory);
  }

  // Get all inventory records
  async findAll(): Promise<Inventory[]> {
    return this.inventoryRepository.find({
      relations: ['product', 'location'],
    });
  }

  // Get a single inventory record by ID
  async findOne(id: number): Promise<Inventory> {
    const inventory = await this.inventoryRepository.findOne({
      where: { id },
      relations: ['product', 'location'],
    });

    if (!inventory) {
      throw new NotFoundException(`Inventory with ID ${id} not found`);
    }

    return inventory;
  }

  // Update an inventory record
  async update(id: number, updateInventoryDto: UpdateInventoryDto): Promise<Inventory> {
    const inventory = await this.inventoryRepository.findOne({
      where: { id },
      relations: ['product', 'location'],
    });

    if (!inventory) {
      throw new NotFoundException(`Inventory with ID ${id} not found`);
    }

    if (updateInventoryDto.quantity) {
      inventory.quantity = updateInventoryDto.quantity;
    }

    if (updateInventoryDto.location_id) {
      const location = await this.locationRepository.findOne({
        where: { id: updateInventoryDto.location_id },
      });
      if (!location) {
        throw new NotFoundException(`Location with ID ${updateInventoryDto.location_id} not found`);
      }
      inventory.location = location;
    }

    return this.inventoryRepository.save(inventory);
  }

  // Delete an inventory record
  async remove(id: number): Promise<void> {
    const inventory = await this.inventoryRepository.findOne({ where: { id } });

    if (!inventory) {
      throw new NotFoundException(`Inventory with ID ${id} not found`);
    }

    await this.inventoryRepository.remove(inventory);
  }
}
