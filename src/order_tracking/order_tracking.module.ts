import { Module } from '@nestjs/common';
import { OrderTrackingService } from './order_tracking.service';
import { OrderTrackingController } from './order_tracking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderTracking } from './entities/order_tracking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderTracking])],
  controllers: [OrderTrackingController],
  providers: [OrderTrackingService],
})
export class OrderTrackingModule {}
