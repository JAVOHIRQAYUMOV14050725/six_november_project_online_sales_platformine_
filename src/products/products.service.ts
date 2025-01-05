import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, ILike, Like, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) { }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const existingProduct = await this.productRepository.findOne({
      where: { name: createProductDto.name },
    });
    if (existingProduct) {
      throw new Error('Product with this name already exists');
    }

    const categoryExists = await this.categoryRepository.findOne({
      where: { id: createProductDto.category_id },
    });
    if (!categoryExists) {
      throw new BadRequestException('Invalid category_id. Category does not exist.');
    }

    const newProduct = this.productRepository.create(createProductDto);
    return this.productRepository.save(newProduct);
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

    if (updateProductDto.category_id && updateProductDto.category_id !== product.category_id) {
      const categoryExists = await this.categoryRepository.findOne({
        where: { id: updateProductDto.category_id },
      });
      if (!categoryExists) {
        throw new BadRequestException('Invalid category_id. Category does not exist.');
      }
    }

    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({ relations: ['productImages'] });  
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['productImages', 'category'], 
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async search(keyword: string): Promise<Product[]> {
    const products = await this.productRepository.find({
      where: { name: ILike(`%${keyword}%`) },
      relations: ['productImages'], 
    });

    if (!products.length) {
      throw new NotFoundException(`No products found matching "${keyword}"`);
    }

    return products;
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }

  async sortByPriceDesc(): Promise<Product[]> {
    return this.productRepository.find({
      order: {
        price: 'DESC',
      },
      relations: ['productImages'],
    });
  }

  async sortByPriceAsc(): Promise<Product[]> {
    return this.productRepository.find({
      order: {
        price: 'ASC',
      },
      relations: ['productImages'], 
    });
  }

  async findByPriceRange(minPrice: number, maxPrice: number): Promise<Product[]> {
    const products = await this.productRepository.find({
      where: {
        price: Between(minPrice, maxPrice),
      },
      relations: ['productImages'], 
    });

    if (!products.length) {
      throw new NotFoundException(
        `No products found between price range ${minPrice} and ${maxPrice}`,
      );
    }

    return products;
  }
}
