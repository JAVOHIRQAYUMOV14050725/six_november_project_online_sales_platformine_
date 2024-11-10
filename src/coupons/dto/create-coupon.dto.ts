import { IsNotEmpty, IsString, IsDecimal, Min, Max, IsDate } from 'class-validator';

export class CreateCouponDto {
    @IsString()
    @IsNotEmpty()
    code: string;

    @IsDecimal()
    @Min(0) 
    @Max(100)
    discount_percentage: number;

    @IsDate()
    valid_from: Date;

    @IsDate()
    valid_to: Date; 
}
