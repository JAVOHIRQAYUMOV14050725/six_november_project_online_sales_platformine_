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
} from '@nestjs/common';
import { WishlistItemsService } from './wishlist_items.service';
import { CreateWishlistItemDto } from './dto/create-wishlist_item.dto';
import { UpdateWishlistItemDto } from './dto/update-wishlist_item.dto';
import { Request } from 'express';
import { AuthGuard } from '../guards/auth.guard';

@Controller('wishlist-items')
@UseGuards(AuthGuard)
export class WishlistItemsController {
  constructor(private readonly wishlistItemsService: WishlistItemsService) { }

  @Post()
  create(@Body() createWishlistItemDto: CreateWishlistItemDto, @Req() req: Request) {
    const userId = req.user?.id; 
    if (!userId) {
      throw new Error('User ID not found');
    }
    return this.wishlistItemsService.create(createWishlistItemDto, userId);
  }

  @Get()
  findAll(@Req() req: Request) {
    const userId = req.user?.id;
    if (!userId) {
      throw new Error('User ID not found');
    }
    return this.wishlistItemsService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    const userId = req.user?.id;
    if (!userId) {
      throw new Error('User ID not found');
    }
    return this.wishlistItemsService.findOne(+id, userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWishlistItemDto: UpdateWishlistItemDto,
    @Req() req: Request,
  ) {
    const userId = req.user?.id;
    if (!userId) {
      throw new Error('User ID not found');
    }
    return this.wishlistItemsService.update(+id, updateWishlistItemDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    const userId = req.user?.id;
    if (!userId) {
      throw new Error('User ID not found');
    }
    return this.wishlistItemsService.remove(+id, userId);
  }
}
