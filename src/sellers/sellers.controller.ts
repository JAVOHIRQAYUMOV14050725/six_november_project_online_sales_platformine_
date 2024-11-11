import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { SellerService } from './sellers.service';
import { UpdateSellerDto } from './dto/update-seller.dto';


@Controller('seller')
@UseGuards(AuthGuard, RolesGuard)
export class SellerController {
  constructor(private readonly sellerService: SellerService) { }


  @Get('/all')
  @Roles('super_admin','admin','manager')
  findAll() {
    return this.sellerService.findAll();
  }

  @Get(':id')
  @Roles('super_admin', 'admin', 'manager')
  findOne(@Param('id') id: string) {
    console.log('Looking for admin with id:', id);
    return this.sellerService.findOne(+id);
  }

  @Patch(':id')
  @Roles('super_admin', 'admin')
  update(@Param('id') id: string, @Body() updateSellerDto: UpdateSellerDto) {
    return this.sellerService.update(+id, updateSellerDto);
  }

  @Delete(':id')
  @Roles('super_admin','admin')
  remove(@Param('id') id: string) {
    return this.sellerService.remove(+id);
  }
}
