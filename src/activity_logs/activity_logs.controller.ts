import { Controller, Post, Body, Param, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateActivityLogDto } from './dto/create-activity_log.dto';
import { ActivityLogService } from './activity_logs.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('activity-logs')
  @UseGuards(AuthGuard,RolesGuard)
export class ActivityLogController {
  constructor(private readonly activityLogService: ActivityLogService) { }

  @Post()
    @Roles('super_admin','admin')
  async createLog(@Body() createActivityLogDto: CreateActivityLogDto) {
    return this.activityLogService.createLog(createActivityLogDto);
  }
}
