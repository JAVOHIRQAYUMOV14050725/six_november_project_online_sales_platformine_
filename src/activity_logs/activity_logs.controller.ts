import { Controller, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { CreateActivityLogDto } from './dto/create-activity_log.dto';
import { ActivityLogService } from './activity_logs.service';

@Controller('activity-logs')
export class ActivityLogController {
  constructor(private readonly activityLogService: ActivityLogService) { }

  @Post()
  async createLog(@Body() createActivityLogDto: CreateActivityLogDto) {
    return this.activityLogService.createLog(createActivityLogDto);
  }
}
