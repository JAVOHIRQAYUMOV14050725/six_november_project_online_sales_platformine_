import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  ForbiddenException,
  Res,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) { }
  async register(createUserDto: CreateUserDto): Promise<Partial<User>> {
    const { name, email, password,phone_number } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const existingUserByPhone = await this.userRepository.findOne({ where: { phone_number } });
    if (existingUserByPhone) {
      throw new ConflictException('phone number already exists');
    }

    const superAdminExists = await this.userRepository.findOne({ where: { role: 'super_admin' } });
    const role = superAdminExists ? 'user' : 'super_admin';

    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      role,
      phone_number,
    });
    const savedUser = await this.userRepository.save(user);

    delete savedUser.password;
    delete savedUser.refreshToken;

    return savedUser;
  }


  async login(email: string, password: string, response: any): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { id: user.id, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1d' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    user.refreshToken = refreshToken;
    await this.userRepository.save(user);

    (response as any).cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    (response as any).send({ accessToken });
  }

  async logout(accessToken: string, response: Response): Promise<{ message: string }> {
    console.time('Logout Duration');
    try {
      const payload = this.jwtService.verify(accessToken);
      const user = await this.userRepository.findOne({ where: { id: payload.id } });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      user.refreshToken = null;
      await this.userRepository.save(user);

      response.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });

      const message = 'Siz muvaffaqiyatli chiqdingiz!';
      response.send({ message });

      return { message };
    } catch (error) {
      throw new UnauthorizedException('Invalid access token');
    }
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findOne({ where: { refreshToken } });

    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const payload = { id: user.id, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1d' });

    return { accessToken };
  }

  async getMe(accessToken: string): Promise<Partial<User>> {
    try {
      const payload = this.jwtService.verify(accessToken);
      const user = await this.userRepository.findOne({ where: { id: payload.id } });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      delete user.password;
      delete user.refreshToken;

      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid access token');
    }
  }

  async getAllUsers(role: string): Promise<{ users: Partial<User>[]; message: string }> {
    let users: User[] = [];
    let message: string;

    // Super Admin - barcha foydalanuvchilar
    if (role === 'super_admin') {
      users = await this.userRepository.find();
      message = `Mana barcha foydalanuvchilar soni: ${users.length}`;
    }
    // Admin - manager, seller, va userlar
    else if (role === 'admin') {
      users = await this.userRepository.find({
        where: [
          { role: 'manager' },
          { role: 'seller' },
          { role: 'user' }
        ],
      });
      message = `Mana sellerlar va userlar soni: ${users.length}`;
    }
    // Manager - seller va userlar
    else if (role === 'manager') {
      users = await this.userRepository.find({
        where: [
          { role: 'seller' },
          { role: 'user' }
        ],
      });
      message = `Mana sellerlar va userlar soni: ${users.length}`;
    }
    // Seller - faqat userlar
    else if (role === 'seller') {
      users = await this.userRepository.find({
        where: { role: 'user' },
      });
      message = `Mana userlar soni: ${users.length}`;
    }
    // User - foydalanuvchiga ruxsat yo'q
    else if (role === 'user') {
      throw new ForbiddenException('Sizda ushbu resursga kirish huquqi yo\'q');
    }
    // No such role
    else {
      throw new ForbiddenException('No such role');
    }

    // Parol va refresh tokenlarni o'chirish
    users.forEach(user => {
      delete user.password;
      delete user.refreshToken;
    });

    return { users, message };
  }

}
