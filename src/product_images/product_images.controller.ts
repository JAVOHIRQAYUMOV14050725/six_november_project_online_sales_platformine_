import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductImagesService } from './product_images.service';
import { CreateProductImageDto } from './dto/create-product_image.dto';
import { UpdateProductImageDto } from './dto/update-product_image.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('productImages')
export class ProductImagesController {
  constructor(private readonly productImagesService: ProductImagesService) { }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
    @Roles('admin','manager', 'super_admin','seller')
  async create(@Body() createProductImageDto: CreateProductImageDto) {
    const image = await this.productImagesService.create(createProductImageDto);
    return { message: 'Product image created successfully', image };
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll() {
    const images = await this.productImagesService.findAll();
    return { message: 'All product images retrieved successfully', images };
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string) {
    const image = await this.productImagesService.findOne(+id);
    return { message: 'Product image retrieved successfully', image };
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'super_admin', 'seller')
  async update(@Param('id') id: string, @Body() updateProductImageDto: UpdateProductImageDto) {
    const updatedImage = await this.productImagesService.update(+id, updateProductImageDto);
    return { message: 'Product image updated successfully', updatedImage };
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'super_admin', 'seller')
  async remove(@Param('id') id: string) {
    await this.productImagesService.remove(+id);
    return { message: `Product image with ID ${id} removed successfully` };
  }
}
