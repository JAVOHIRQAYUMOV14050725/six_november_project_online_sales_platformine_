import { IsNotEmpty, IsString, IsIn, MaxLength } from 'class-validator';

export class CreateTranslationDto {
    @IsString()
    @IsNotEmpty()
    @IsIn(['en', 'ru', 'uz']) // Faqat ma'lum tillar ruxsat etiladi
    language_code: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255, { message: 'Key length must not exceed 255 characters' })
    key: string;

    @IsString()
    @IsNotEmpty()
    value: string;
}
