import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShoppingCartDto } from './dto/create-shopping_cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping_cart.dto';
import { ShoppingCart } from './entities/shopping_cart.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectRepository(ShoppingCart)
    private readonly shoppingCartRepository: Repository<ShoppingCart>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createShoppingCartDto: CreateShoppingCartDto): Promise<ShoppingCart> {
    const user = await this.userRepository.findOne({ where: { id: createShoppingCartDto.userId } });

    if (!user) {
      throw new BadRequestException('Foydalanuvchi topilmadi!');
    }

    const existingCart = await this.shoppingCartRepository.findOne({
      where: { user: { id: createShoppingCartDto.userId } },
    });

    if (existingCart) {
      throw new BadRequestException('Siz allaqachon savatchaga egasiz!');
    }

    const shoppingCart = this.shoppingCartRepository.create({
      user,
      cartItems: [],
    });

    return await this.shoppingCartRepository.save(shoppingCart);
  }

  async findAll(userId: number): Promise<ShoppingCart[]> {
    return await this.shoppingCartRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'cartItems'],
    });
  }

  async findOne(id: number, userId: number): Promise<ShoppingCart> {
    const shoppingCart = await this.shoppingCartRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['user', 'cartItems'],
    });

    if (!shoppingCart) {
      throw new NotFoundException('Savatcha topilmadi yoki sizga tegishli emas!');
    }

    return shoppingCart;
  }

  async update(
    id: number,
    updateShoppingCartDto: UpdateShoppingCartDto,
    userId: number,
  ): Promise<ShoppingCart> {
    const shoppingCart = await this.findOne(id, userId);

    Object.assign(shoppingCart, updateShoppingCartDto);

    return await this.shoppingCartRepository.save(shoppingCart);
  }

  async remove(id: number, userId: number): Promise<void> {
    const shoppingCart = await this.findOne(id, userId);

    await this.shoppingCartRepository.remove(shoppingCart);
  }
}
