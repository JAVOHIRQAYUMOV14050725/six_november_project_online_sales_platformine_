import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { ManagerService } from './manager.service';
import { UpdateManagerDto } from './dto/update-manager.dto';


@Controller('manager')
@UseGuards(AuthGuard, RolesGuard)
export class ManagerController {
  constructor(private readonly managerService: ManagerService) { }


  @Get('/all')
  @Roles('super_admin')
  findAll() {
    return this.managerService.findAll();
  }

  @Get(':id')
  @Roles('super_admin')
  findOne(@Param('id') id: string) {
    console.log('Looking for admin with id:', id);
    return this.managerService.findOne(+id);
  }

  @Patch(':id')
  @Roles('super_admin')
  update(@Param('id') id: string, @Body() updateManagerDto: UpdateManagerDto) {
    return this.managerService.update(+id, updateManagerDto);
  }

  @Delete(':id')
  @Roles('super_admin')
  remove(@Param('id') id: string) {
    return this.managerService.remove(+id);
  }
}
