import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { ILike, Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>, 
  ) { }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const existingCategory = await this.findByName(createCategoryDto.name);
    if (existingCategory) {
      throw new ConflictException(`Category name '${createCategoryDto.name}' is already taken`);
    }

    const newCategory = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(newCategory);
  }

  async findAll(): Promise<any[]> {
    try {
      const categories = await this.categoryRepository.find();
      return await Promise.all(
        categories.map(async (category) => {
          const products = await this.productRepository.find({
            where: { id: category.id },  
          });
          return {
            id: category.id,
            name: category.name,
            products: products.length ? products : [],  
          };
        })
      );
    } catch (error) {
      throw new NotFoundException('Error fetching categories and products');
    }
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['products'], 
    });

    if (!category) {
      const allCategories = await this.findAll();
      throw new NotFoundException({
        message: `Category with ID ${id} not found`,
        allCategories,
      });
    }

    return category;
  }

  async findByName(name: string): Promise<Category | undefined> {
    return await this.categoryRepository.findOne({ where: { name } });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.findOne(id);

    if (updateCategoryDto.name && updateCategoryDto.name !== category.name) {
      const existingCategory = await this.findByName(updateCategoryDto.name);
      if (existingCategory) {
        throw new ConflictException(`Category name '${updateCategoryDto.name}' is already taken`);
      }
    }

    Object.assign(category, updateCategoryDto);
    return await this.categoryRepository.save(category);
  }

  async remove(id: number): Promise<void> {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      const allCategories = await this.findAll();
      throw new NotFoundException({
        message: `Category with ID ${id} not found`,
        allCategories,
      });
    }

    await this.categoryRepository.remove(category);
  }

  async search(query: string): Promise<Category[]> {
    const categories = await this.categoryRepository.find({
      where: { name: ILike(`%${query}%`) }, 
    });

    if (!categories.length) {
      throw new NotFoundException(`No categories found matching query: '${query}'`);
    }

    return categories;
  }
}
