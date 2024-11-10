// create-address.dto.ts
import { IsString, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateAddressDto {
    @IsNotEmpty()
    @IsString()
    user_id: number;  

    @IsNotEmpty()
    @IsString()
    @Length(1, 255)
    address_line1: string;

    @IsOptional() 
    @IsString()
    address_line2: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    city: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    state: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 20)
    postal_code: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    country: string;
}
