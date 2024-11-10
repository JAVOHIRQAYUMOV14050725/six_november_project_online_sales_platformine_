import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { UserRole } from './entities/user_role.entity';
import { Manager } from 'src/manager/entities/manager.entity';
import { Seller } from 'src/sellers/entities/seller.entity';
import { Admin } from 'src/admins/entities/admin.entity';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserRolesService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserRole) private userRolesRepository: Repository<UserRole>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
    @InjectRepository(Manager) private managerRepository: Repository<Manager>,
    @InjectRepository(Seller) private sellerRepository: Repository<Seller>,
  ) { }

  async assignRole(userId: number, roleName: 'admin' | 'manager' | 'seller' | 'user'): Promise<User | { users: { id: number, name: string }[] }> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles', 'manager', 'admin', 'seller'],
    });

    if (!user) {
      const existingUsers = await this.userRepository.find({
        where: { role: 'user' }, // user roli bo'lgan foydalanuvchilarni olish
        select: ['id', 'name']   // faqat id va name maydonlarini olish
      });


      if (existingUsers.length === 0) {
        throw new NotFoundException('Foydalanuvchi yoki rol topilmadi');
      }

      

      // user roli bo'lgan mavjud foydalanuvchilarni qaytarish
      return { users: existingUsers };
    }

 

    // Foydalanuvchi allaqachon mavjud bo'lgan rolni olganligini tekshirish
    const existingRole = user.roles?.find(userRole => userRole.role?.name === roleName);

    if (existingRole) {
      throw new ForbiddenException('Siz allaqachon ushbu rolda ekansiz');
    }

    // Agar rol topilmasa, yangi rol qo'shish
    const role = await this.roleRepository.findOne({ where: { name: roleName } });
    if (!role) {
      throw new NotFoundException('Rol topilmadi');
    }

    // Yangi UserRole obyekti yaratish
    const userRole = new UserRole();
    userRole.user = user;
    userRole.role = role;

    // Yangi UserRole saqlash
    await this.userRolesRepository.save(userRole);

    // Userning yangi rolini o'rnatish
    user.roles.push(userRole);
    user.role = roleName;
    await this.userRepository.save(user);

    // Admin, manager, yoki seller roli bo'lsa, mos entity yaratish
    if (roleName === 'admin') {
      let admin = await this.adminRepository.findOne({ where: { user: { id: userId } } });
      if (!admin) {
        admin = new Admin();
        admin.user = user;
        await this.adminRepository.save(admin);
      }
    } else if (roleName === 'manager') {
      let manager = await this.managerRepository.findOne({ where: { user: { id: userId } } });
      if (!manager) {
        manager = new Manager();
        manager.user = user;
        manager.store_name = 'Default Store';
        await this.managerRepository.save(manager);
      }
    } else if (roleName === 'seller') {
      let seller = await this.sellerRepository.findOne({ where: { user: { id: userId } } });
      if (!seller) {
        seller = new Seller();
        seller.user = user;
        await this.sellerRepository.save(seller);
      }
    }

    // Yangilangan foydalanuvchini qaytarish
    const updatedUser = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ['roles', 'manager', 'admin', 'seller'],
    });

    const safeUser = plainToClass(User, updatedUser);
    delete safeUser.password;
    delete safeUser.refreshToken;

    return safeUser;
  }
}
