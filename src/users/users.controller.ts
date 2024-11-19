import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../guards/auth.guard';
import { UsersService } from './users.service';
import { ActivityLogService } from '../activity_logs/activity_logs.service';
import { Request } from 'express';

// Lokal tip yaratish
interface ExtendedRequest extends Request {
  user: {
    id: number;
    role: string;
  };
}

@Controller('user')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly activityLogService: ActivityLogService
  ) { }

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get('getAll')
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: ExtendedRequest
  ) {
    const userId = req.user.id;
    const role = req.user.role;
    return await this.userService.update(+id, updateUserDto, userId, role);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(+id);
  }
}
