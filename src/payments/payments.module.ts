import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/entities/user.entity';
import { Order } from 'src/orders/entities/order.entity';
import { PaymentStatus } from 'src/payment_statuses/entities/payment_status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment,User,Order,PaymentStatus]),
           JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions:{expiresIn:'1d'}
           }),
            UsersModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
