import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { CartItemsService } from './cart_items.service';
import { CreateCartItemDto } from './dto/create-cart_item.dto';
import { UpdateCartItemDto } from './dto/update-cart_item.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Request } from 'express';

@Controller('cart-items')
@UseGuards(AuthGuard)
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) { }

  @Post()
  async create(@Body() createCartItemDto: CreateCartItemDto, @Req() req: Request) {
    const userId = req.user?.id;
    if (!userId) {
      throw new ForbiddenException('Foydalanuvchi autentifikatsiya qilinmagan!');
    }
    return this.cartItemsService.create({ ...createCartItemDto, userId });
  }

  @Get()
  async findAll() {
    return this.cartItemsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.cartItemsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    return this.cartItemsService.update(+id, updateCartItemDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.cartItemsService.remove(+id);
  }
}
