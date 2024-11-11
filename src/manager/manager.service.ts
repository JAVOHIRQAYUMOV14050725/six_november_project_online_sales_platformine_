import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Manager } from './entities/manager.entity';
import { UpdateManagerDto } from './dto/update-manager.dto';

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(Manager) private readonly managerRepository: Repository<Manager>,
  ) { }

  async findAll() {
    const managers = await this.managerRepository.find({
      where: {
        user: {
          role: 'manager',
        },
      },
      relations: ['user'],
    });

    return managers.map(manager => ({
      id: manager.id,
      user: {
        name: manager.user.name,
        phone_number: manager.user.phone_number,
        gmail: manager.user.email,
        role: manager.user.role,
      },
    }));
  }

  async findOne(id: any) {
    if (isNaN(Number(id))) {
      throw new BadRequestException('Invalid ID format. ID must be a number.');
    }

    const manager = await this.managerRepository.findOne({
      where: { id, user: { role: 'manager' } },
      relations: ['user'],
    });

    if (!manager) {
      const managers = await this.managerRepository.find({
        where: {
          user: {
            role: 'manager',
          },
        },
        relations: ['user'],
      });

      if (managers.length === 0) {
        throw new NotFoundException('Bazada ayni vaqtda manager mavjud emas');
      } else {
        return {
          message: 'Manager topilmadi. Mana bazadagi managerlar:',
          managers: managers.map(m => ({
            id: m.id,
            name: m.user.name,
          })),
        };
      }
    }

    return {
      id: manager.id,
      user: {
        name: manager.user.name,
        phone_number: manager.user.phone_number,
        gmail: manager.user.email,
        role: manager.user.role,
      },
    };
  }

  async update(id: any, updateManagerDto: UpdateManagerDto) {
    if (isNaN(Number(id))) {
      throw new BadRequestException('Invalid ID format. ID must be a number.');
    }

    const manager = await this.managerRepository.preload({
      id,
      ...updateManagerDto,
    });

    if (!manager) {
      const managers = await this.managerRepository.find({
        where: {
          user: {
            role: 'manager',
          },
        },
        relations: ['user'],
      });

      if (managers.length === 0) {
        throw new NotFoundException('Bazada ayni vaqtda manager mavjud emas');
      } else {
        return {
          message: 'Manager topilmadi. Mana bazadagi managerlar:',
          managers: managers.map(m => ({
            id: m.id,
            name: m.user.name,
          })),
        };
      }
    }

    return this.managerRepository.save(manager);
  }

  async remove(id: any) {
    if (isNaN(Number(id))) {
      throw new BadRequestException('Invalid ID format. ID must be a number.');
    }

    const manager = await this.managerRepository.findOne({
      where: { id, user: { role: 'manager' } },
      relations: ['user'],
    });

    if (!manager) {
      const managers = await this.managerRepository.find({
        where: {
          user: {
            role: 'manager',
          },
        },
        relations: ['user'],
      });

      if (managers.length === 0) {
        throw new NotFoundException('Bazada ayni vaqtda manager mavjud emas');
      } else {
        return {
          message: 'Manager topilmadi. Mana bazadagi managerlar:',
          managers: managers.map(m => ({
            id: m.id,
            name: m.user.name,
          })),
        };
      }
    }

    return this.managerRepository.remove(manager);
  }
}
