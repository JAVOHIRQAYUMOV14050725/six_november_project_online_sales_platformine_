import { IsInt, IsPositive, IsNotEmpty, IsOptional, Min } from 'class-validator';

export class CreateInventoryDto {
    @IsInt()
    @IsNotEmpty()
    @Min(1, { message: 'Product ID must be a positive integer greater than 0' })
    product_id: number;

    @IsInt()
    @IsPositive()
    @Min(1, { message: 'Quantity must be a positive integer greater than 0' })
    quantity: number;

    @IsInt()
    @IsNotEmpty()
    @Min(1, { message: 'Location ID must be a positive integer greater than 0' })
    location_id: number;
}
