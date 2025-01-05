import { Module } from '@nestjs/common';
import { PaymentStatusesService } from './payment_statuses.service';
import { PaymentStatusesController } from './payment_statuses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentStatus } from './entities/payment_status.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentStatus]),
             JwtModule.register({
                  secret: process.env.JWT_SECRET,
                  signOptions:{expiresIn:'1d'}
             }),
              UsersModule],
  controllers: [PaymentStatusesController],
  providers: [PaymentStatusesService],
})
export class PaymentStatusesModule {}
