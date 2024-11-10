import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateWishlistDto {
    @IsNotEmpty()
    @IsInt()
    userId: number;
}
