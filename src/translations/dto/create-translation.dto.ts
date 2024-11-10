import { IsNotEmpty, IsString, IsIn } from 'class-validator';

export class CreateTranslationDto {
    @IsString()
    @IsNotEmpty()
    @IsIn(['en', 'ru', 'uz']) 
    language_code: string;

    @IsString()
    @IsNotEmpty()
    key: string;

    @IsString()
    @IsNotEmpty()
    value: string; 
}
