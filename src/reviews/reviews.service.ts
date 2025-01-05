import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const { user_id, product_id, rating, comment } = createReviewDto;

    // Foydalanuvchi tekshiruvi
    const user = await this.userRepository.findOne({ where: { id: user_id } });
    if (!user) {
      throw new BadRequestException(`User with ID ${user_id} not found`);
    }

    // Mahsulot tekshiruvi
    const product = await this.productRepository.findOne({ where: { id: product_id } });
    if (!product) {
      throw new BadRequestException(`Product with ID ${product_id} not found`);
    }

    // Yangi review yaratish
    const newReview = this.reviewRepository.create({
      user,
      product,
      rating,
      comment,
    });

    return await this.reviewRepository.save(newReview);
  }

  async findAll(): Promise<Review[]> {
    return await this.reviewRepository.find({ relations: ['user', 'product'] });
  }

  async findOne(id: number): Promise<Review> {
    const review = await this.reviewRepository.findOne({
      where: { id },
      relations: ['user', 'product'],
    });

    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    return review;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto): Promise<Review> {
    const review = await this.findOne(id);

    Object.assign(review, updateReviewDto);

    return await this.reviewRepository.save(review);
  }

  async remove(id: number): Promise<void> {
    const review = await this.findOne(id);

    await this.reviewRepository.remove(review);
  }

  async findByProduct(product_id: number): Promise<Review[]> {
    return await this.reviewRepository.find({
      where: { product: { id: product_id } },
      relations: ['user', 'product'],
    });
  }
}
