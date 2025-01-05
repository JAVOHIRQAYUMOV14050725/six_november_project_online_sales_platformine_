import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createWishlistDto: CreateWishlistDto) {
    const user = await this.userRepository.findOne({
      where: { id: createWishlistDto.userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${createWishlistDto.userId} not found`);
    }

    const newWishlist = this.wishlistRepository.create({
      user,
    });

    return await this.wishlistRepository.save(newWishlist);
  }

  async findAll() {
    return await this.wishlistRepository.find({
      relations: ['user', 'wishlistItems'],
    });
  }

  async findOne(id: number) {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id },
      relations: ['user', 'wishlistItems'],
    });

    if (!wishlist) {
      throw new NotFoundException(`Wishlist with ID ${id} not found`);
    }

    return wishlist;
  }

  async update(id: number, updateWishlistDto: UpdateWishlistDto) {
    const wishlist = await this.wishlistRepository.findOne({ where: { id } });

    if (!wishlist) {
      throw new NotFoundException(`Wishlist with ID ${id} not found`);
    }

    const updatedWishlist = Object.assign(wishlist, updateWishlistDto);

    return await this.wishlistRepository.save(updatedWishlist);
  }

  async remove(id: number) {
    const wishlist = await this.wishlistRepository.findOne({ where: { id } });

    if (!wishlist) {
      throw new NotFoundException(`Wishlist with ID ${id} not found`);
    }

    await this.wishlistRepository.remove(wishlist);

    return { message: `Wishlist with ID ${id} has been removed successfully` };
  }
}
