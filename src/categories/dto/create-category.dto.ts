import { IsInt, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
    @IsNotEmpty()
  @Length(3, 100)
  name: string; 

  @IsInt()
  @IsOptional()
  parentCategoryId?: number;  
}
