import { Injectable } from '@nestjs/common';
import { CreatePaymentStatusDto } from './dto/create-payment_status.dto';
import { UpdatePaymentStatusDto } from './dto/update-payment_status.dto';

@Injectable()
export class PaymentStatusesService {
  create(createPaymentStatusDto: CreatePaymentStatusDto) {
    return 'This action adds a new paymentStatus';
  }

  findAll() {
    return `This action returns all paymentStatuses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentStatus`;
  }

  update(id: number, updatePaymentStatusDto: UpdatePaymentStatusDto) {
    return `This action updates a #${id} paymentStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentStatus`;
  }
}
