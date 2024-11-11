import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manager } from './entities/manager.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Manager]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions:{expiresIn:'1d'}
    }),
    UsersModule
  ],
  controllers: [ManagerController],
  providers: [ManagerService],
})
export class ManagerModule {}
