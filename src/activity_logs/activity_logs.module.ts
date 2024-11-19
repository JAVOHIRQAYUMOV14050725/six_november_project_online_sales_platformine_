import { Module } from '@nestjs/common';
import { ActivityLogService } from './activity_logs.service';
import { ActivityLogController } from './activity_logs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityLog } from './entities/activity_log.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityLog,User])],
  controllers: [ActivityLogController],
  providers: [ActivityLogService],
  exports: [ActivityLogService]
})
export class ActivityLogsModule {}
