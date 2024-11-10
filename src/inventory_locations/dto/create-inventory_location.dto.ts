import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateInventoryLocationDto {
    @IsString()
    @IsNotEmpty({ message: 'Location name cannot be empty' })
    @MaxLength(100, { message: 'Location name cannot exceed 100 characters' })
    location: string; 
}
