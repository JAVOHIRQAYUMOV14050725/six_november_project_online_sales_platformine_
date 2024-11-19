import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Auth } from '../auth/entities/auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { ActivityLogsModule } from '../activity_logs/activity_logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Auth]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '23h' },
    }),
    ActivityLogsModule 
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],  
})
export class UsersModule { }
