import { IsString, IsNotEmpty } from 'class-validator';

export class CreateBrandDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    country: string;
}

