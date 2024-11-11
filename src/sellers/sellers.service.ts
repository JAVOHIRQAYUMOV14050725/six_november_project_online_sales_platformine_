import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seller } from './entities/seller.entity';
import { UpdateSellerDto } from './dto/update-seller.dto';

@Injectable()
export class SellerService {
  constructor(
    @InjectRepository(Seller) private readonly sellerRepository: Repository<Seller>,
  ) { }

  async findAll() {
    const sellers = await this.sellerRepository.find({
      where: {
        user: {
          role: 'seller',
        },
      },
      relations: ['user'],
    });

    return sellers.map(seller => ({
      id: seller.id,
      user: {
        name: seller.user.name,
        phone_number: seller.user.phone_number,
        gmail: seller.user.email,
        role: seller.user.role,
      },
    }));
  }

  async findOne(id: any) {
    if (isNaN(Number(id))) {
      throw new BadRequestException('Invalid ID format. ID must be a number.');
    }

    const seller = await this.sellerRepository.findOne({
      where: { id, user: { role: 'seller' } },
      relations: ['user'],
    });

    if (!seller) {
      const sellers = await this.sellerRepository.find({
        where: {
          user: {
            role: 'seller',
          },
        },
        relations: ['user'],
      });

      if (sellers.length === 0) {
        throw new NotFoundException('Bazada ayni vaqtda seller mavjud emas');
      } else {
        return {
          message: 'Seller topilmadi. Mana bazadagi sellerlar:',
          sellers: sellers.map(s => ({
            id: s.id,
            name: s.user.name,
          })),
        };
      }
    }

    return {
      id: seller.id,
      user: {
        name: seller.user.name,
        phone_number: seller.user.phone_number,
        gmail: seller.user.email,
        role: seller.user.role,
      },
    };
  }

  async update(id: any, updateSellerDto: UpdateSellerDto) {
    if (isNaN(Number(id))) {
      throw new BadRequestException('Invalid ID format. ID must be a number.');
    }

    const seller = await this.sellerRepository.preload({
      id,
      ...updateSellerDto,
    });

    if (!seller) {
      const sellers = await this.sellerRepository.find({
        where: {
          user: {
            role: 'seller',
          },
        },
        relations: ['user'],
      });

      if (sellers.length === 0) {
        throw new NotFoundException('Bazada ayni vaqtda seller mavjud emas');
      } else {
        return {
          message: 'Seller topilmadi. Mana bazadagi sellerlar:',
          sellers: sellers.map(s => ({
            id: s.id,
            name: s.user.name,
          })),
        };
      }
    }

    return this.sellerRepository.save(seller);
  }

  async remove(id: any) {
    if (isNaN(Number(id))) {
      throw new BadRequestException('Invalid ID format. ID must be a number.');
    }

    const seller = await this.sellerRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!seller) {
      const sellers = await this.sellerRepository.find({
        where: {
          user: {
            role: 'seller',
          },
        },
        relations: ['user'],
      });

      if (sellers.length === 0) {
        throw new NotFoundException('Bazada ayni vaqtda seller mavjud emas');
      } else {
        return {
          message: 'Seller topilmadi. Mana bazadagi sellerlar:',
          sellers: sellers.map(s => ({
            id: s.id,
            name: s.user.name,
          })),
        };
      }
    }

    return this.sellerRepository.remove(seller);
  }
}
