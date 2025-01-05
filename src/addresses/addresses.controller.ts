import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('addresses')
@UseGuards(AuthGuard, RolesGuard)
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) { }

  @Post()
  create(@Body() createAddressDto: CreateAddressDto, @Request() req) {
    const user_id = req.user.id;
    return this.addressesService.create(createAddressDto, user_id);
  }

  @Get()
  @Roles('admin', 'manager', 'super_admin', 'seller', 'user')
  async findAll(@Request() req) {
    const userRole = req.user.role;
    const userId = req.user.id;
    return this.addressesService.findAll(userRole, userId);
  }

  @Get(':id')
  @Roles('admin', 'manager', 'super_admin', 'seller', 'user')
  async findOne(@Param('id') id: string, @Request() req) {
    const userRole = req.user.role;
    const userId = req.user.id;
    return this.addressesService.findOne(+id, userRole, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto, @Request() req) {
    const user_id = req.user.id;
    return this.addressesService.update(+id, updateAddressDto, user_id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const userRole = req.user.role; 
    const userId = req.user.id; 
    return this.addressesService.remove(+id, userRole, userId); 
  }

}
