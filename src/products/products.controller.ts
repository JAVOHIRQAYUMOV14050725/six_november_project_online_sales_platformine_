import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, BadRequestException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Product } from './entities/product.entity';
import { Roles } from '../decorators/roles.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'super_admin')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get('search')
  async search(@Query('keyword') keyword: string): Promise<Product[]> {
    return this.productsService.search(keyword);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
    @Roles('admin','super_admin','manager','seller')
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'super_admin', 'manager', 'seller')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'super_admin', 'manager', 'seller')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'super_admin')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }

  @Get('sort/desc')
  async sortByPriceDesc() {
    return this.productsService.sortByPriceDesc();
  }

  @Get('sort/asc')
  async sortByPriceAsc() {
    return this.productsService.sortByPriceAsc();
  }

  
  @Get('filter/price/:min/:max')
  async findByPriceRange(
    @Param('min') minPrice: string,
    @Param('max') maxPrice: string,
  ) {
    console.log('Params - min:', minPrice, 'max:', maxPrice); // Debug uchun log

    const min = Number(minPrice);
    const max = Number(maxPrice);

    if (isNaN(min) || isNaN(max)) {
      throw new BadRequestException('Invalid price range values');
    }

    if (!Number.isInteger(min) || !Number.isInteger(max)) {
      throw new BadRequestException('Price values must be valid integers.');
    }

    if (min > max) {
      throw new BadRequestException('Minimum price cannot be greater than maximum price');
    }

    return this.productsService.findByPriceRange(min, max);
  }



}
