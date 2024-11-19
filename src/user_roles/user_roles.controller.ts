import { Controller, Param, Patch, UseGuards, ForbiddenException, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { UserRolesService } from './user_roles.service';
import { Roles } from '../decorators/roles.decorator';

@Controller('user-roles')
@UseGuards(AuthGuard, RolesGuard)
export class UserRolesController {
  constructor(private readonly userRolesService: UserRolesService) { }

  @Patch(':id/role/admin')
  @Roles('super_admin')
  async assignAdminRole(@Param('id') userId: number) {
    try {
      return await this.userRolesService.assignRole(userId, 'admin');
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Foydalanuvchi yoki rol topilmadi');
      }
      if (error instanceof ForbiddenException) {
        throw new ForbiddenException('Admin rolini faqat super_admin tayinlashi mumkin');
      }
      throw error;
    }
  }

  @Patch(':id/role/manager')
  @Roles('super_admin', 'admin')
  async assignManagerRole(@Param('id') userId: number) {
    try {
      return await this.userRolesService.assignRole(userId, 'manager');
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Foydalanuvchi yoki rol topilmadi');
      }
      if (error instanceof ForbiddenException) {
        throw new ForbiddenException('Manager rolini faqat super_admin yoki admin tayinlashi mumkin');
      }
      throw error;
    }
  }

  @Patch(':id/role/seller')
  @Roles('super_admin', 'admin', 'manager')  
  async assignSellerRole(@Param('id') userId: number) {
    try {
      return await this.userRolesService.assignRole(userId, 'seller');
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Foydalanuvchi yoki rol topilmadi');
      }
      if (error instanceof ForbiddenException) {
        throw new ForbiddenException('Seller rolini faqat super_admin, admin yoki manager tayinlashi mumkin');
      }
      throw error;
    }
  }

  @Patch(':id/role/user')
  @Roles('super_admin', 'admin')
  async assignUserRole(@Param('id') userId: number) {
    try {
      return await this.userRolesService.assignRole(userId, 'user');
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Foydalanuvchi yoki rol topilmadi');
      }
      if (error instanceof ForbiddenException) {
        throw new ForbiddenException('User rolini faqat super_admin yoki admin tayinlashi mumkin');
      }
      throw error;
    }
  }
}