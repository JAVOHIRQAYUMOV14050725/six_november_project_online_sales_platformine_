import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { CompanyProductsService } from './company_products.service';
import { CreateCompanyProductDto } from './dto/create-company_product.dto';
import { UpdateCompanyProductDto } from './dto/update-company_product.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('companyProducts')
@UseGuards(AuthGuard, RolesGuard)
export class CompanyProductsController {
  constructor(private readonly companyProductsService: CompanyProductsService) { }

  @Post()
    @Roles('super_admin','admin','manager')
  async create(@Body() createCompanyProductDto: CreateCompanyProductDto) {
    return await this.companyProductsService.create(createCompanyProductDto);
  }

  @Get()
  @Roles('super_admin', 'admin', 'manager','seller')
  async findAll() {
    return await this.companyProductsService.findAll();
  }

  @Get(':id')
  @Roles('super_admin', 'admin', 'manager','seller')
  async findOne(@Param('id') id: string) {
    return await this.companyProductsService.findOne(+id);
  }

  @Patch(':id')
  @Roles('super_admin', 'admin', 'manager')
  async update(
    @Param('id') id: string,
    @Body() updateCompanyProductDto: UpdateCompanyProductDto,
  ) {
    return await this.companyProductsService.update(+id, updateCompanyProductDto);
  }

  @Delete(':id')
  @Roles('super_admin', 'admin', 'manager')
  async remove(@Param('id') id: string) {
    return await this.companyProductsService.remove(+id);
  }
}
