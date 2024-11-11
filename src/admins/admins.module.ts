import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Admin,User]),
      JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '23h' },
      }),
      UsersModule
  ],
  controllers: [AdminsController],
  providers: [AdminsService],
})
export class AdminsModule {}
