import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateNotificationDto {
    @IsString()
    @IsNotEmpty()
    message: string;
    
    @IsInt()
    @IsNotEmpty()
    userId: number; 
}
