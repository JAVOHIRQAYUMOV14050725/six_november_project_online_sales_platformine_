import { IsInt, IsString, IsUrl, IsNotEmpty } from 'class-validator';

export class CreateProductImageDto {
    @IsInt()
    @IsNotEmpty()
    productId: number; 

    @IsString()
    @IsNotEmpty()
    @IsUrl()
    imageUrl: string;  
}
