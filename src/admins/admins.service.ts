import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin) private readonly adminRepository: Repository<Admin>,
  ) { }


  async findAll() {
    const admins = await this.adminRepository.find({
      where: {
        user: {
          role: 'admin',
        },
      },
      relations: ['user'],
    });

    if (admins.length === 0) {
      throw new NotFoundException('No admins found in the database');
    }

    return admins.map(admin => ({
      id: admin.id,
      user: {
        name: admin.user.name,
        phone_number: admin.user.phone_number,
        gmail: admin.user.email,
        role: admin.user.role,
      },
    }));
  }

  async findOne(id: any) {
    if (isNaN(Number(id))) {
      throw new BadRequestException('Invalid ID format. ID must be a number.');
    }

    const admin = await this.adminRepository.findOne({
      where: { id, user: { role: 'admin' } },
      relations: ['user'],
    });

    if (!admin) {
      const allAdmins = await this.adminRepository.find({
        where: { user: { role: 'admin' } },
        relations: ['user'],
      });

      if (allAdmins.length === 0) {
        throw new NotFoundException('Currently, there are no admins in the database');
      }

      return allAdmins.map(a => ({
        id: a.id,
        name: a.user.name,
      }));
    }

    return {
      id: admin.id,
      user: {
        name: admin.user.name,
        phone_number: admin.user.phone_number,
        gmail: admin.user.email,
        role: admin.user.role,
      },
    };
  }

  async update(id: any, updateAdminDto: UpdateAdminDto) {
    if (isNaN(Number(id))) {
      throw new BadRequestException('Invalid ID format. ID must be a number.');
    }

    const admin = await this.adminRepository.findOne({
      where: { id, user: { role: 'admin' } },
      relations: ['user'],
    });

    if (!admin) {
      const allAdmins = await this.adminRepository.find({
        where: { user: { role: 'admin' } },
        relations: ['user'],
      });

      if (allAdmins.length === 0) {
        throw new NotFoundException('Currently, there are no admins in the database');
      }

      return allAdmins.map(a => ({
        id: a.id,
        name: a.user.name,
      }));
    }

    Object.assign(admin, updateAdminDto);
    return this.adminRepository.save(admin);
  }

  async remove(id: any) {
    if (isNaN(Number(id))) {
      throw new BadRequestException('Invalid ID format. ID must be a number.');
    }

    const admin = await this.adminRepository.findOne({
      where: { id, user: { role: 'admin' } },
      relations: ['user'],
    });

    if (!admin) {
      const allAdmins = await this.adminRepository.find({
        where: { user: { role: 'admin' } },
        relations: ['user'],
      });

      if (allAdmins.length === 0) {
        throw new NotFoundException('Currently, there are no admins in the database');
      }

      return allAdmins.map(a => ({
        id: a.id,
        name: a.user.name,
      }));
    }

    return this.adminRepository.remove(admin);
  }
}
