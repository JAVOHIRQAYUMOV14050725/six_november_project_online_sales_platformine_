import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { AuthGuard } from '../guards/auth.guard';

@Controller('wishlists')
  @UseGuards(AuthGuard)
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) { }

  @Post()
  async create(@Body() createWishlistDto: CreateWishlistDto) {
    return await this.wishlistsService.create(createWishlistDto);
  }

  @Get()
  async findAll() {
    return await this.wishlistsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.wishlistsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateWishlistDto: UpdateWishlistDto) {
    return await this.wishlistsService.update(+id, updateWishlistDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.wishlistsService.remove(+id);
  }
}
