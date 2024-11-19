import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>, 
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const existingProduct = await this.productRepository.findOne({
      where: { name: createProductDto.name },
    });
    if (existingProduct) {
      throw new Error('Product with this name already exists');
    }

    const newProduct = this.productRepository.create(createProductDto);
    return this.productRepository.save(newProduct);
  }


  async findAll(): Promise<Product[]> {
    return this.productRepository.find(); 
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }


  async search(keyword: string): Promise<Product[]> {
    const products = await this.productRepository.find({
      where: { name: Like(`%${keyword}%`) }, // Case-insensitive search
    });

    if (!products.length) {
      throw new NotFoundException(`No products found matching "${keyword}"`);
    }

    return products;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id);

    if (updateProductDto.name && updateProductDto.name !== product.name) {
      const existingProduct = await this.productRepository.findOne({
        where: { name: updateProductDto.name },
      });
      if (existingProduct) {
        throw new Error('Product with this name already exists');
      }
    }

    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }


  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product); 
  }
}
