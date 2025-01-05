import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { Order } from 'src/orders/entities/order.entity';
import { PaymentStatus } from 'src/payment_statuses/entities/payment_status.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(PaymentStatus)
    private readonly paymentStatusRepository: Repository<PaymentStatus>,
  ) { }

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const { order_id, payment_method, amount, status_id } = createPaymentDto;

    const order = await this.orderRepository.findOne({ where: { id: order_id } });
    if (!order) {
      throw new NotFoundException(`Order with ID ${order_id} not found`);
    }

    const status = await this.paymentStatusRepository.findOne({ where: { id: status_id } });
    if (!status) {
      throw new NotFoundException(`Payment status with ID ${status_id} not found`);
    }

    const payment = this.paymentRepository.create({
      order,
      payment_method,
      amount,
      status,
    });

    return await this.paymentRepository.save(payment);
  }

  async findAll(): Promise<Payment[]> {
    return await this.paymentRepository.find({
      relations: ['order', 'status'],
    });
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { id },
      relations: ['order', 'status'],
    });

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    return payment;
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
    const payment = await this.findOne(id);

    const { status_id, ...rest } = updatePaymentDto;

    if (status_id) {
      const status = await this.paymentStatusRepository.findOne({ where: { id: status_id } });
      if (!status) {
        throw new NotFoundException(`Payment status with ID ${status_id} not found`);
      }
      payment.status = status;
    }

    Object.assign(payment, rest);

    return await this.paymentRepository.save(payment);
  }

  async remove(id: number): Promise<void> {
    const payment = await this.findOne(id);
    await this.paymentRepository.remove(payment);
  }
}
