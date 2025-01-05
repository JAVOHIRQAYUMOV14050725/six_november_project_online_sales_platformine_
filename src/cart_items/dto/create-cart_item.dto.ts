import { IsInt, IsPositive, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCartItemDto {
    @IsInt({ message: 'Product ID must be an integer' })
    @IsPositive({ message: 'Product ID must be a positive integer' })
    @IsNotEmpty({ message: 'Product ID cannot be empty' })
    product_id: number;

    @IsInt({ message: 'Quantity must be an integer' })
    @IsPositive({ message: 'Quantity must be a positive integer' })
    @IsNotEmpty({ message: 'Quantity cannot be empty' })
    quantity: number;

    @IsOptional()
    shoppingCarts?: number[];

    @IsInt({ message: 'User ID must be an integer' })
    @IsNotEmpty({ message: 'User ID cannot be empty' })
    userId: number;
}
