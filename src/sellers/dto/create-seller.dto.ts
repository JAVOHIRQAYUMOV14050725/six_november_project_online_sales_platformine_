import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateSellerDto {
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    user_id: number;

    @IsNotEmpty()
    created_at: Date;

    @IsNotEmpty()
    updated_at: Date;
}
