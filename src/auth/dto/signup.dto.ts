import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { CreateUserDto } from '../../user/dto/create-user.dto.js';

export class SignupDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    @Matches(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    @Matches(/[0-9]/, { message: 'Password must contain at least one number' })
    @Matches(/[\W_]/, { message: 'Password must contain at least one special character' })
    password: string;

    @IsNotEmpty()
    @IsString()
    username: string;
}