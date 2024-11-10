import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateCompanyProductDto {
    @IsNotEmpty()
    @IsInt()
    company_id: number;

    @IsNotEmpty()
    @IsInt()
    product_id: number;
}
