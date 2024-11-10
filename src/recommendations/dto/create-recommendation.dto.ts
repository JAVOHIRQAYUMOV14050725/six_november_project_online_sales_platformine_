import { IsInt, IsPositive, IsNotEmpty } from 'class-validator';

export class CreateRecommendationDto {
    @IsInt()
    @IsNotEmpty()
    userId: number;

    @IsInt()
    @IsPositive() 
    @IsNotEmpty()
    productId: number;
}
