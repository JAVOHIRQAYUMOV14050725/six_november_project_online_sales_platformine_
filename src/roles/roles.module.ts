import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { UserRole } from 'src/user_roles/entities/user_role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, User,UserRole]),
    
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    UsersModule
  ],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
