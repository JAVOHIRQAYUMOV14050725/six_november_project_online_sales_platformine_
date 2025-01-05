import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ShoppingCartService } from './shopping_cart.service';
import { CreateShoppingCartDto } from './dto/create-shopping_cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping_cart.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('shopping-cart')
@UseGuards(AuthGuard)
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) { }

  @Post()
  create(@Body() createShoppingCartDto: CreateShoppingCartDto, @Req() req: Request) {
    const userId = req.user.id; // Extracting the user ID from the request
    return this.shoppingCartService.create({ ...createShoppingCartDto, userId });
  }

  @Get()
  findAll(@Req() req: Request) {
    const userId = req.user.id; // Extracting the user ID
    return this.shoppingCartService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    const userId = req.user.id; // Extracting the user ID
    return this.shoppingCartService.findOne(+id, userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateShoppingCartDto: UpdateShoppingCartDto,
    @Req() req: Request,
  ) {
    const userId = req.user.id; // Extracting the user ID
    return this.shoppingCartService.update(+id, updateShoppingCartDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    const userId = req.user.id; // Extracting the user ID
    return this.shoppingCartService.remove(+id, userId);
  }
}
