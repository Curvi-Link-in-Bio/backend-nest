import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateLinkDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    url: string;
    
    @IsNotEmpty()
    @IsString()
    category: string;

    @IsOptional()
    @IsBoolean()
    active: boolean;
}