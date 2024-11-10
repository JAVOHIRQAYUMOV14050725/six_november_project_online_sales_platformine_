import { IsInt, IsString, IsNotEmpty, IsDecimal, IsPositive } from 'class-validator';

export class CreatePaymentDto {
    @IsInt()
    @IsNotEmpty()
    order_id: number;  

    @IsString()
    @IsNotEmpty()
    payment_method: string;  

    @IsDecimal()
    @IsPositive()
    amount: number; 

    @IsInt()
    @IsNotEmpty()
    status_id: number; 

}
