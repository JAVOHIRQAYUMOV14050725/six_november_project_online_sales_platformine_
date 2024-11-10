import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderTrackingDto } from './create-order_tracking.dto';

export class UpdateOrderTrackingDto extends PartialType(CreateOrderTrackingDto) {}
