import { Module } from '@nestjs/common';
import { SellerService } from './sellers.service';
import { SellerController } from './sellers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seller } from './entities/seller.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Seller]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '23h' },
    }),
    UsersModule
  ],
  controllers: [SellerController],
  providers: [SellerService],
})
export class SellersModule {}
