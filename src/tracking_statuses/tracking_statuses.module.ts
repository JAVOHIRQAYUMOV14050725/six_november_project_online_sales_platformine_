import { Module } from '@nestjs/common';
import { TrackingStatusesService } from './tracking_statuses.service';
import { TrackingStatusesController } from './tracking_statuses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackingStatus } from './entities/tracking_status.entity';

@Module({
  imports : [TypeOrmModule.forFeature([TrackingStatus])],
  controllers: [TrackingStatusesController],
  providers: [TrackingStatusesService],
})
export class TrackingStatusesModule {}
