import {
 Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCartItemDto } from './dto/create-cart_item.dto';
import { UpdateCartItemDto } from './dto/update-cart_item.dto';
import { CartItem } from './entities/cart_item.entity';
import { Product } from 'src/products/entities/product.entity';
import { ShoppingCart } from 'src/shopping_cart/entities/shopping_cart.entity';


@Injectable()
export class CartItemsService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ShoppingCart)
    private readonly shoppingCartRepository: Repository<ShoppingCart>,
  ) { }

  async create(createCartItemDto: CreateCartItemDto): Promise<CartItem> {
    const { product_id, quantity, shoppingCarts, userId } = createCartItemDto;

    // Mahsulotni tekshirish
    const product = await this.productRepository.findOne({ where: { id: product_id } });
    if (!product) {
      throw new NotFoundException('Mahsulot topilmadi!');
    }

    // Shopping Cartlarni tekshirish (agar berilgan bo'lsa)
    const carts = shoppingCarts
      ? await this.shoppingCartRepository.find({
        where: shoppingCarts.map((id) => ({ id, user: { id: userId } })),
      })
      : [];

    if (shoppingCarts && carts.length !== shoppingCarts.length) {
      throw new BadRequestException('Berilgan shopping cartlarning ba\'zilari topilmadi!');
    }

    // Yangi CartItem yaratish
    const cartItem = this.cartItemRepository.create({
      product,
      quantity,
      shoppingCarts: carts,
    });

    return await this.cartItemRepository.save(cartItem);
  }


  async findAll(): Promise<CartItem[]> {
    return await this.cartItemRepository.find({
      relations: ['product', 'shoppingCarts'],
    });
  }

  async findOne(id: number): Promise<CartItem> {
    const cartItem = await this.cartItemRepository.findOne({
      where: { id },
      relations: ['product', 'shoppingCarts'],
    });

    if (!cartItem) {
      throw new NotFoundException('CartItem topilmadi!');
    }

    return cartItem;
  }

  async update(
    id: number,
    updateCartItemDto: UpdateCartItemDto,
  ): Promise<CartItem> {
    const cartItem = await this.findOne(id);

    Object.assign(cartItem, updateCartItemDto);

    return await this.cartItemRepository.save(cartItem);
  }

  async remove(id: number): Promise<void> {
    const cartItem = await this.findOne(id);

    await this.cartItemRepository.remove(cartItem);
  }
}
