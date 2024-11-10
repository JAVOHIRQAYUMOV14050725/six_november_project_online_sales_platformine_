import { Module } from '@nestjs/common';
import { OrderStatusesService } from './order_statuses.service';
import { OrderStatusesController } from './order_statuses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderStatus } from './entities/order_status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderStatus])],
  controllers: [OrderStatusesController],
  providers: [OrderStatusesService],
})
export class OrderStatusesModule {}
