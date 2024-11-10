import { Expose } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional,  IsPhoneNumber,  IsString, Length } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    name: string;

    @IsNotEmpty()
    @IsEmail()
    @Length(1, 100)
    email: string;

    @IsNotEmpty()
    @IsPhoneNumber('UZ')
    phone_number:string

    @IsNotEmpty()
    @IsString()
    @Length(6, 100)
    password: string;

    @IsOptional()
    @IsString()
    @Expose()
    role: string;
}
