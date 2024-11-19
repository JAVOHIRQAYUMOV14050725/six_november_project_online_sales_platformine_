import { Module, forwardRef } from '@nestjs/common';
import { ActivityLogService } from './activity_logs.service';
import { ActivityLogController } from './activity_logs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityLog } from './entities/activity_log.entity';
import { User } from '../users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ActivityLog, User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    forwardRef(() => UsersModule),
  ],
  controllers: [ActivityLogController],
  providers: [ActivityLogService],
  exports: [ActivityLogService],
})
export class ActivityLogsModule { }
