import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWishlistItemDto } from './dto/create-wishlist_item.dto';
import { UpdateWishlistItemDto } from './dto/update-wishlist_item.dto';
import { WishlistItem } from './entities/wishlist_item.entity';
import { Wishlist } from '../wishlists/entities/wishlist.entity';

@Injectable()
export class WishlistItemsService {
  constructor(
    @InjectRepository(WishlistItem)
    private readonly wishlistItemRepository: Repository<WishlistItem>,
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
  ) { }

  async create(createWishlistItemDto: CreateWishlistItemDto, userId: number) {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id: createWishlistItemDto.wishlistId, user: { id: userId } },
    });

    if (!wishlist) {
      throw new ForbiddenException('Siz ushbu wishlistga mahsulot qo\'sha olmaysiz!');
    }

    const wishlistItem = this.wishlistItemRepository.create({
      wishlist,
      product: { id: createWishlistItemDto.productId },
    });

    return await this.wishlistItemRepository.save(wishlistItem);
  }

  async findAll(userId: number) {
    return await this.wishlistItemRepository.find({
      where: { wishlist: { user: { id: userId } } },
      relations: ['wishlist', 'product'],
    });
  }

  async findOne(id: number, userId: number) {
    const wishlistItem = await this.wishlistItemRepository.findOne({
      where: { id, wishlist: { user: { id: userId } } },
      relations: ['wishlist', 'product'],
    });

    if (!wishlistItem) {
      throw new NotFoundException('Wishlist elementi topilmadi!');
    }

    return wishlistItem;
  }

  async update(
    id: number,
    updateWishlistItemDto: UpdateWishlistItemDto,
    userId: number,
  ) {
    const wishlistItem = await this.findOne(id, userId);
    Object.assign(wishlistItem, updateWishlistItemDto);

    return await this.wishlistItemRepository.save(wishlistItem);
  }

  async remove(id: number, userId: number) {
    const wishlistItem = await this.findOne(id, userId);
    return await this.wishlistItemRepository.remove(wishlistItem);
  }
}
