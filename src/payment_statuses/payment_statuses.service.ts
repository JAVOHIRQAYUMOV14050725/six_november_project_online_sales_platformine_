import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentStatusDto } from './dto/create-payment_status.dto';
import { UpdatePaymentStatusDto } from './dto/update-payment_status.dto';
import { PaymentStatus } from './entities/payment_status.entity';

@Injectable()
export class PaymentStatusesService {
  constructor(
    @InjectRepository(PaymentStatus)
    private readonly paymentStatusRepository: Repository<PaymentStatus>,
  ) { }

  async create(createPaymentStatusDto: CreatePaymentStatusDto): Promise<PaymentStatus> {
    const paymentStatus = this.paymentStatusRepository.create(createPaymentStatusDto);
    return await this.paymentStatusRepository.save(paymentStatus);
  }

  async findAll(): Promise<PaymentStatus[]> {
    return await this.paymentStatusRepository.find();
  }

  async findOne(id: number): Promise<PaymentStatus> {
    const paymentStatus = await this.paymentStatusRepository.findOne({ where: { id } });

    if (!paymentStatus) {
      throw new NotFoundException(`Payment status with ID ${id} not found`);
    }

    return paymentStatus;
  }

  async update(id: number, updatePaymentStatusDto: UpdatePaymentStatusDto): Promise<PaymentStatus> {
    const paymentStatus = await this.findOne(id);

    Object.assign(paymentStatus, updatePaymentStatusDto);

    return await this.paymentStatusRepository.save(paymentStatus);
  }

  async remove(id: number): Promise<void> {
    const paymentStatus = await this.findOne(id);

    await this.paymentStatusRepository.remove(paymentStatus);
  }
}
