import { IsNotEmpty, IsString, IsBoolean, IsInt, IsUrl, IsOptional } from "class-validator";

export class CreateLinkDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    @IsUrl()
    url: string;

    @IsOptional()
    @IsBoolean()
    active: boolean;

    @IsNotEmpty()
    @IsString()
    category: string;

    @IsOptional()
    @IsInt()
    position: number;
}
