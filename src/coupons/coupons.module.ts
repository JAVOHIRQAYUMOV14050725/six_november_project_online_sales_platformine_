import { Module } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CouponsController } from './coupons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Coupon]),
             JwtModule.register({
                  secret: process.env.JWT_SECRET,
                  signOptions:{expiresIn:'1d'}
             }),
              UsersModule],
  controllers: [CouponsController],
  providers: [CouponsService],
})
export class CouponsModule {}
