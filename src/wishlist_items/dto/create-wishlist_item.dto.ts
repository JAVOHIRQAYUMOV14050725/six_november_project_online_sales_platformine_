import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateWishlistItemDto {
    @IsInt()
    @IsNotEmpty()
    wishlistId: number;

    @IsInt()
    @IsNotEmpty()
    productId: number;
}
