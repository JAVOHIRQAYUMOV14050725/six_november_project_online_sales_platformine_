import { Module } from '@nestjs/common';
import { UserRolesService } from './user_roles.service';
import { UserRolesController } from './user_roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRole } from './entities/user_role.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { RolesModule } from 'src/roles/roles.module';
import { Role } from 'src/roles/entities/role.entity';
import { JwtModule } from '@nestjs/jwt';
import { Admin } from 'src/admins/entities/admin.entity';
import { Seller } from 'src/sellers/entities/seller.entity';
import { Manager } from 'src/manager/entities/manager.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserRole, User, Role,Admin,Seller,Manager]),
  UsersModule,
    RolesModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '23h' },
    }),
  ],
  controllers: [UserRolesController],
  providers: [UserRolesService],
})
export class UserRolesModule {}
