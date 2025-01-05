import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Coupon } from './entities/coupon.entity';

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
  ) { }

  async create(createCouponDto: CreateCouponDto): Promise<Coupon> {
    const { code, discount_percentage, valid_from, valid_to } = createCouponDto;

    // Validatsiya: Mavjud kodni tekshirish
    const existingCoupon = await this.couponRepository.findOne({
      where: { code },
    });
    if (existingCoupon) {
      throw new BadRequestException(`Coupon code '${code}' already exists`);
    }

    // Yangi kupon yaratish
    const coupon = this.couponRepository.create({
      code,
      discount_percentage,
      valid_from,
      valid_to,
    });

    return await this.couponRepository.save(coupon);
  }

  async findAll(): Promise<Coupon[]> {
    return await this.couponRepository.find();
  }

  async findOne(id: number): Promise<Coupon> {
    const coupon = await this.couponRepository.findOne({ where: { id } });
    if (!coupon) {
      throw new NotFoundException(`Coupon with ID ${id} not found`);
    }
    return coupon;
  }

  async update(
    id: number,
    updateCouponDto: UpdateCouponDto,
  ): Promise<Coupon> {
    const coupon = await this.findOne(id);

    Object.assign(coupon, updateCouponDto);

    return await this.couponRepository.save(coupon);
  }

  async remove(id: number): Promise<void> {
    const coupon = await this.findOne(id);
    await this.couponRepository.remove(coupon);
  }

  async validateCoupon(code: string): Promise<Coupon> {
    const coupon = await this.couponRepository.findOne({
      where: { code },
    });

    if (!coupon) {
      throw new NotFoundException(`Coupon with code '${code}' not found`);
    }

    const now = new Date();
    if (now < coupon.valid_from || now > coupon.valid_to) {
      throw new BadRequestException(`Coupon code '${code}' is not valid`);
    }

    return coupon;
  }
}
