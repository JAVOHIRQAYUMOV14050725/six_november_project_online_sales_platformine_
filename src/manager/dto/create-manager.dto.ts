import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateManagerDto {
    @IsNotEmpty()
    @IsInt()
    user_id: number;

    @IsNotEmpty()
    @IsInt()
    company_id: number;

    @IsNotEmpty()
    @IsString()
    store_name: string;
}
