import { IsString, IsNotEmpty } from 'class-validator';

export class CreateActivityLogDto {
    @IsString()
    @IsNotEmpty()
    action: string;

    user_id: number;  
}
