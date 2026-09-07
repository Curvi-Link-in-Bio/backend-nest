import { IsNotEmpty, IsString, Matches } from "class-validator";

export class ResetPasswordConfirmDto {
    @IsNotEmpty()
    @IsString()
    @Matches(/[A-Z]/, { message: 'newPassword must contain at least one uppercase letter' })
    @Matches(/[a-z]/, { message: 'newPassword must contain at least one lowercase letter' })
    @Matches(/[0-9]/, { message: 'newPassword must contain at least one number' })
    @Matches(/[\W_]/, { message: 'newPassword must contain at least one special character' })
    newPassword: string;
}