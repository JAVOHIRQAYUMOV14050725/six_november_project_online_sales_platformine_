// src/activity-logs/activity-log.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityLog } from './entities/activity_log.entity';
import { User } from '../users/entities/user.entity';
import { CreateActivityLogDto } from './dto/create-activity_log.dto';

@Injectable()
export class ActivityLogService {
  constructor(
    @InjectRepository(ActivityLog)
    private readonly activityLogRepository: Repository<ActivityLog>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async createLog(createActivityLogDto: CreateActivityLogDto): Promise<ActivityLog> {
    const { action, user_id } = createActivityLogDto;
    const user = await this.userRepository.findOne({ where: { id: user_id } });

    if (!user) {
      throw new Error('Foydalanuvchi topilmadi');
    }

    const log = new ActivityLog();
    log.user = user;
    log.action = action;

    return await this.activityLogRepository.save(log);
  }
}
