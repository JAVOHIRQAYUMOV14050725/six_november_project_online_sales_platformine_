import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { PaymentStatusesService } from './payment_statuses.service';
import { CreatePaymentStatusDto } from './dto/create-payment_status.dto';
import { UpdatePaymentStatusDto } from './dto/update-payment_status.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('payment-statuses')
    @UseGuards(AuthGuard)
export class PaymentStatusesController {
  constructor(private readonly paymentStatusesService: PaymentStatusesService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createPaymentStatusDto: CreatePaymentStatusDto) {
    return this.paymentStatusesService.create(createPaymentStatusDto);
  }

  @Get()
  async findAll() {
    return this.paymentStatusesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.paymentStatusesService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePaymentStatusDto: UpdatePaymentStatusDto) {
    return this.paymentStatusesService.update(+id, updatePaymentStatusDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.paymentStatusesService.remove(+id);
  }
}
