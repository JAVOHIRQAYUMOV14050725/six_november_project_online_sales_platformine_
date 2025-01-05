import { Module } from '@nestjs/common';
import { CartItemsService } from './cart_items.service';
import { CartItemsController } from './cart_items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './entities/cart_item.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { ShoppingCart } from 'src/shopping_cart/entities/shopping_cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem,User,Product,ShoppingCart]),
         JwtModule.register({
              secret: process.env.JWT_SECRET,
              signOptions:{expiresIn:'1d'}
         }),
          UsersModule],
  controllers: [CartItemsController],
  providers: [CartItemsService],
})
export class CartItemsModule {}
