import {
  Injectable,
  ConflictException,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });
      if (existingUser) {
        throw new ConflictException(`User with email ${createUserDto.email} already exists.`);
      }

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const newUser = this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });

      const savedUser = await this.userRepository.save(newUser);
      delete savedUser.password;
      return savedUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const existingUser = await this.userRepository.findOne({ where: { id } });

      if (!existingUser) {
        throw new NotFoundException(`User with ID ${id} not found.`);
      }

      await this.userRepository.update(id, updateUserDto);
      return {
        message: `User with ID #${id} updated successfully.`,
        updatedUser: { id, ...updateUserDto },
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const users = await this.userRepository.find();
      return users.map(user => ({
        ...user,
        password: undefined,
      }));
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number) {
    try {
      const foundUser = await this.userRepository.findOne({ where: { id } });
      if (!foundUser) {
        throw new NotFoundException(`User with ID ${id} not found.`);
      }

      const { password, ...userWithoutSensitiveData } = foundUser;
      return userWithoutSensitiveData;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    try {
      const existingUser = await this.userRepository.findOne({ where: { id } });

      if (!existingUser) {
        throw new NotFoundException(`User with ID ${id} not found.`);
      }

      await this.userRepository.delete(id);
      return { message: `User with ID #${id} has been removed.` };
    } catch (error) {
      throw new HttpException(error.message || 'An error occurred while deleting the user.', HttpStatus.BAD_REQUEST);
    }
  }

  async findOneUser(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { id } });
  }



}
