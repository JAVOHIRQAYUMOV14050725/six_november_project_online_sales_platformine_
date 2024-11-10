import { Module } from '@nestjs/common';
import { WishlistItemsService } from './wishlist_items.service';
import { WishlistItemsController } from './wishlist_items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishlistItem } from './entities/wishlist_item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WishlistItem])],
  controllers: [WishlistItemsController],
  providers: [WishlistItemsService],
})
export class WishlistItemsModule {}
