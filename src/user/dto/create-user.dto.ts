import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ThemeEnum } from "../enums/theme.enum.js";
import { PlanEnum } from "../enums/plan.enum.js";
import { PaymentMethodEnum } from "../enums/paymentMethod.enum.js";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    email: string;
    
    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    displayName: string;
    
    @IsOptional()
    @IsString()
    bio: string;
    
    @IsOptional()
    @IsString()
    avatarUrl: string;
    
    @IsNotEmpty()
    @IsEnum(ThemeEnum)
    theme: ThemeEnum;
    
    @IsNotEmpty()
    @IsString()
    buttonColor: string;
    
    @IsNotEmpty()
    @IsString()
    backgroundColor: string;
    
    @IsOptional()
    @IsString()
    backgroundImageUrl: string;
    
    @IsNotEmpty()
    @IsEnum(PlanEnum)
    plan: PlanEnum;
    
    @IsNotEmpty()
    @IsEnum(PaymentMethodEnum)
    paymentMethod: PaymentMethodEnum;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    categories: string[];
}
