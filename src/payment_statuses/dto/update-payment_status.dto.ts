import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentStatusDto } from './create-payment_status.dto';

export class UpdatePaymentStatusDto extends PartialType(CreatePaymentStatusDto) {}
