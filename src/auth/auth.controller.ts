import { request } from 'express';
import { Controller, Post, Body, UseGuards, Headers, Get, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { Request, Response } from 'express';
import { CreateUserDto } from '../users/dto/create-user.dto';

interface CustomRequest extends Request {
  cookies: { [key: string]: string };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    return this.authService.register(body);
  }

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Res() response: Response,
  ) {
    return this.authService.login(body.email, body.password, response);
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Headers('authorization') authorizationHeader: string, @Res() response: Response) {
    const tokens = authorizationHeader.split(' ');
    const accessToken = tokens[1];
    const result = await this.authService.logout(accessToken, response);
    return result;
  }

  @UseGuards(AuthGuard)
  @Post('refresh-token')
  async refreshToken(@Req() request: CustomRequest) {
    const refreshToken = request.cookies['refreshToken'];
    return this.authService.refreshToken(refreshToken);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async getMe(@Headers('authorization') authorizationHeader: string) {
    const tokens = authorizationHeader.split(' ');
    const accessToken = tokens[1];
    return this.authService.getMe(accessToken);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Get('users/all')
  @Roles('super_admin', 'admin', 'manager', 'seller')
  async findAll(@Req() req: any): Promise<{ message: string, users: any[] }> {
    const userRole = req.user.role;
    const { message, users } = await this.authService.getAllUsers(userRole);

    let formattedUsers: any[] = [];

    if (userRole === 'super_admin') {
      formattedUsers = [
        {
          "Mana adminlar": users.filter(user => user.role === 'admin').map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
          })),
        },
        {
          "Mana managerlar": users.filter(user => user.role === 'manager').map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
          })),
        },
        {
          "Mana sellerlar": users.filter(user => user.role === 'seller').map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
          })),
        },
        {
          "Mana userlar": users.filter(user => user.role === 'user').map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
          })),
        },
      ];
    }
    else if (userRole === 'admin') {
      formattedUsers = [
        {
          "Mana managerlar": users.filter(user => user.role === 'manager').map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
          })),
        },
        {
          "Mana sellerlar": users.filter(user => user.role === 'seller').map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
          })),
        },
        {
          "Mana userlar": users.filter(user => user.role === 'user').map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
          })),
        },
      ];
    }
    else if (userRole === 'manager') {
      formattedUsers = [
        {
          "Mana sellerlar": users.filter(user => user.role === 'seller').map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
          })),
        },
        {
          "Mana userlar": users.filter(user => user.role === 'user').map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
          })),
        },
      ];
    }
    // Seller - faqat userlar
    else if (userRole === 'seller') {
      formattedUsers = [
        {
          "Mana userlar": users.filter(user => user.role === 'user').map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
          })),
        },
      ];
    }

    return { message, users: formattedUsers };
  }

}
