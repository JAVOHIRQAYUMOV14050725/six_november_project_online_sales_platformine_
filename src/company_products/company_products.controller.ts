import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CompanyProductsService } from './company_products.service';
import { CreateCompanyProductDto } from './dto/create-company_product.dto';
import { UpdateCompanyProductDto } from './dto/update-company_product.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@ApiTags('Company Products')
@Controller('companyProducts')
@UseGuards(AuthGuard, RolesGuard)
export class CompanyProductsController {
  constructor(private readonly companyProductsService: CompanyProductsService) { }

  @Post()
  @ApiBearerAuth() // Token bu metod uchun talab qilinadi
  @Roles('super_admin', 'admin', 'manager')
  @ApiOperation({ summary: 'Create a new Company Product' })
  @ApiResponse({ status: 201, description: 'Company Product created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async create(@Body() createCompanyProductDto: CreateCompanyProductDto) {
    return await this.companyProductsService.create(createCompanyProductDto);
  }

  @Get()
  @ApiBearerAuth() // Token bu metod uchun talab qilinadi
  @Roles('super_admin', 'admin', 'manager', 'seller')
  @ApiOperation({ summary: 'Retrieve all Company Products' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved all Company Products.' })
  async findAll() {
    return await this.companyProductsService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth() // Token bu metod uchun talab qilinadi
  @Roles('super_admin', 'admin', 'manager', 'seller')
  @ApiOperation({ summary: 'Retrieve a specific Company Product by ID' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved the Company Product.' })
  @ApiResponse({ status: 404, description: 'Company Product not found.' })
  async findOne(@Param('id') id: string) {
    return await this.companyProductsService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth() // Token bu metod uchun talab qilinadi
  @Roles('super_admin', 'admin', 'manager')
  @ApiOperation({ summary: 'Update a specific Company Product by ID' })
  @ApiResponse({ status: 200, description: 'Successfully updated the Company Product.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiResponse({ status: 404, description: 'Company Product not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateCompanyProductDto: UpdateCompanyProductDto,
  ) {
    return await this.companyProductsService.update(+id, updateCompanyProductDto);
  }

  @Delete(':id')
  @ApiBearerAuth() // Token bu metod uchun talab qilinadi
  @Roles('super_admin', 'admin', 'manager')
  @ApiOperation({ summary: 'Delete a specific Company Product by ID' })
  @ApiResponse({ status: 200, description: 'Successfully deleted the Company Product.' })
  @ApiResponse({ status: 404, description: 'Company Product not found.' })
  async remove(@Param('id') id: string) {
    return await this.companyProductsService.remove(+id);
  }
}
