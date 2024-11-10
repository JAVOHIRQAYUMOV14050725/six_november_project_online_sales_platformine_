import { Injectable } from '@nestjs/common';
import { CreateTrackingStatusDto } from './dto/create-tracking_status.dto';
import { UpdateTrackingStatusDto } from './dto/update-tracking_status.dto';

@Injectable()
export class TrackingStatusesService {
  create(createTrackingStatusDto: CreateTrackingStatusDto) {
    return 'This action adds a new trackingStatus';
  }

  findAll() {
    return `This action returns all trackingStatuses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trackingStatus`;
  }

  update(id: number, updateTrackingStatusDto: UpdateTrackingStatusDto) {
    return `This action updates a #${id} trackingStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} trackingStatus`;
  }
}
