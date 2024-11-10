import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';


@Controller('admin')
  @UseGuards(AuthGuard,RolesGuard)
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) { }

 
  @Get('/all')
  findAll() {
    return this.adminsService.findAll();
  }

  @Get(':id')
  @Roles('super_admin')  
  findOne(@Param('id') id: string) {
    console.log('Looking for admin with id:', id);
    return this.adminsService.findOne(+id);
  }

  @Patch(':id')
  @Roles('super_admin') 
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  @Roles('super_admin')
  remove(@Param('id') id: string) {
    return this.adminsService.remove(+id);
  }
}
