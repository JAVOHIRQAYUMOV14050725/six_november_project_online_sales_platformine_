import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreatePaymentStatusDto {
    @IsString()
    @IsNotEmpty()  
    @Length(3, 255)  
    status: string;
}
