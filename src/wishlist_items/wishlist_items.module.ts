import { Module } from '@nestjs/common';
import { WishlistItemsService } from './wishlist_items.service';
import { WishlistItemsController } from './wishlist_items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishlistItem } from './entities/wishlist_item.entity';
import { User } from '../users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { Wishlist } from '../wishlists/entities/wishlist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WishlistItem,User,Wishlist]),
     JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions:{expiresIn:'1d'}
     }),
      UsersModule],
  controllers: [WishlistItemsController],
  providers: [WishlistItemsService],
})
export class WishlistItemsModule {}
