import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateProductImageDto } from './dto/create-product_image.dto';
import { UpdateProductImageDto } from './dto/update-product_image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductImage } from './entities/product_image.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class ProductImagesService {
  constructor(
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  async create(createProductImageDto: CreateProductImageDto): Promise<ProductImage> {
    const { productId, imageUrl } = createProductImageDto;

    try {
      const product = await this.productRepository.findOneBy({ id: productId });

      if (!product) {
        const allProducts = await this.productRepository.find();
        const productInfo = allProducts.map((prod) => ({
          id: prod.id,
          name: prod.name,
        }));

        throw new NotFoundException({
          message: `Product with ID ${productId} not found.`,
          products: productInfo,
        });
      }

      const existingImage = await this.productImageRepository.findOneBy({ imageUrl });
      if (existingImage) {
        throw new ConflictException({
          message: `Image with URL '${imageUrl}' already exists.`,
        });
      }

      const newImage = this.productImageRepository.create({ product, imageUrl });
      return await this.productImageRepository.save(newImage);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<ProductImage[]> {
    try {
      return await this.productImageRepository.find({ relations: ['product'] });
    } catch (error) {
      throw new Error('Failed to retrieve product images');
    }
  }

  async findOne(id: number): Promise<ProductImage> {
    try {
      const image = await this.productImageRepository.findOne({ where: { id }, relations: ['product'] });
      if (!image) {
        throw new NotFoundException({
          message: `Product image with ID ${id} not found`,
        });
      }
      return image;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateProductImageDto: UpdateProductImageDto): Promise<ProductImage> {
    try {
      const image = await this.findOne(id);
      const { productId } = updateProductImageDto;

      const product = await this.productRepository.findOneBy({ id: productId });
      if (!product) {
        const allProducts = await this.productRepository.find();
        const productInfo = allProducts.map((prod) => ({
          id: prod.id,
          name: prod.name,
        }));

        throw new NotFoundException({
          message: `Product with ID ${productId} not found.`,
          products: productInfo,
        });
      }

      Object.assign(image, updateProductImageDto);
      return await this.productImageRepository.save(image);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const image = await this.findOne(id);
      await this.productImageRepository.remove(image);
    } catch (error) {
      throw error;
    }
  }
}
