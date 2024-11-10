// create-company.dto.ts
import { IsNotEmpty, IsString, IsOptional, Length, IsEmail } from 'class-validator';

export class CreateCompanyDto {
    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 255)
    address: string;

    @IsNotEmpty()
    @IsString()
    @Length(7, 15)
    phone_number: string;

    @IsNotEmpty()
    @IsEmail()
    @Length(1, 100)
    email: string;

    @IsOptional()
    @IsString()
    @Length(1, 100)
    website?: string;
}
