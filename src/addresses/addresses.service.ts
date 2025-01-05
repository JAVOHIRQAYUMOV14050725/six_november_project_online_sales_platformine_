import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';
import { User } from '../users/entities/user.entity';
@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  private omitSensitiveFields(user: User): User {
    const { password, refreshToken, iat, ...userWithoutSensitiveInfo } = user;
    return userWithoutSensitiveInfo as User;  
  }

  async create(createAddressDto: CreateAddressDto, user_id: number): Promise<Address> {
    const user = await this.userRepository.findOne({
      where: { id: user_id },
      select: ['id', 'name', 'email', 'role'],  
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${user_id} not found`);
    }

    const newAddress = this.addressRepository.create(createAddressDto);
    newAddress.users = [this.omitSensitiveFields(user)];

    return this.addressRepository.save(newAddress);
  }

  // Get all addresses (with role-based filtering)
  async findAll(userRole: string, userId: number): Promise<Address[]> {
    if (['admin', 'super_admin', 'manager', 'seller'].includes(userRole)) {
      const addresses = await this.addressRepository.find({
        relations: ['users'],
        select: ['address_line1', 'address_line2', 'city', 'state', 'postal_code', 'country', 'created_at', 'updated_at'],
      });

      addresses.forEach(address => {
        address.users = address.users.map(this.omitSensitiveFields);
      });

      return addresses;
    } else if (userRole === 'user') {
      const addresses = await this.addressRepository.find({
        where: { users: { id: userId } },
        relations: ['users'],
        select: ['address_line1', 'address_line2', 'city', 'state', 'postal_code', 'country', 'created_at', 'updated_at'],
      });

      addresses.forEach(address => {
        address.users = address.users.map(this.omitSensitiveFields);
      });

      return addresses;
    } else {
      throw new HttpException('Unauthorized', HttpStatus.FORBIDDEN);
    }
  }

  async findOne(id: number, userRole: string, userId: number): Promise<Address> {
    const address = await this.addressRepository.findOne({
      where: { id },
      relations: ['users'],
      select: ['address_line1', 'address_line2', 'city', 'state', 'postal_code', 'country', 'created_at', 'updated_at'],
    });

    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }

    if (['admin', 'super_admin', 'manager', 'seller'].includes(userRole)) {
      address.users = address.users.map(this.omitSensitiveFields);
      return address;
    }

    if (userRole === 'user' && address.users.some(user => user.id === userId)) {
      address.users = address.users.map(this.omitSensitiveFields);
      return address;
    }

    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  // Update an address
  async update(id: number, updateAddressDto: UpdateAddressDto, user_id: number): Promise<Address> {
    const address = await this.addressRepository.findOne({
      where: { id },
      relations: ['users'],
    });
    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }

    // Check if the address is associated with the user
    const user = address.users.find(u => u.id === user_id);
    if (!user) {
      throw new HttpException('You are not authorized to update this address', HttpStatus.FORBIDDEN);
    }

    address.users = address.users.map(this.omitSensitiveFields);
    Object.assign(address, updateAddressDto);
    return this.addressRepository.save(address);
  }

  async remove(id: number, userRole: string, userId: number): Promise<void> {
    const address = await this.findOne(id, userRole, userId);  // Now passing userRole and userId
    await this.addressRepository.remove(address);
  }

}
