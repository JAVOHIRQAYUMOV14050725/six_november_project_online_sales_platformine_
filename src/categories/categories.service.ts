import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
  ) { }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const existingCategory = await this.findByName(createCategoryDto.name);
    if (existingCategory) {
      throw new ConflictException(`Category name '${createCategoryDto.name}' is already taken`);
    }

    const newCategory = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(newCategory);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });

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
}
