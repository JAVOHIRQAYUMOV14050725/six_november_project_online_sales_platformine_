// create-order-item.dto.ts
import { IsInt, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateOrderItemDto {
    @IsInt()
    @IsNotEmpty()
    order_id: number;

    @IsInt()
    @IsNotEmpty()
    product_id: number;

    @IsInt()
    @IsPositive()
    quantity: number;

    @IsNumber()
    @IsPositive()
    price: number;
}
