import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrackingStatusesService } from './tracking_statuses.service';
import { CreateTrackingStatusDto } from './dto/create-tracking_status.dto';
import { UpdateTrackingStatusDto } from './dto/update-tracking_status.dto';

@Controller('tracking-statuses')
export class TrackingStatusesController {
  constructor(private readonly trackingStatusesService: TrackingStatusesService) {}

  @Post()
  create(@Body() createTrackingStatusDto: CreateTrackingStatusDto) {
    return this.trackingStatusesService.create(createTrackingStatusDto);
  }

  @Get()
  findAll() {
    return this.trackingStatusesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trackingStatusesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrackingStatusDto: UpdateTrackingStatusDto) {
    return this.trackingStatusesService.update(+id, updateTrackingStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trackingStatusesService.remove(+id);
  }
}
