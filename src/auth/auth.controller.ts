import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, Head, Headers } from '@nestjs/common';
import { ResetPasswordConfirmDto } from './dto/reset-password-confirm.dto.js';
import { AuthService } from './auth.service.js';
import { CreateAuthDto } from './dto/create-auth.dto.js';
import { UpdateAuthDto } from './dto/update-auth.dto.js';
import { SignupDto } from './dto/signup.dto.js';
import { SigninDto } from './dto/signin.dto.js';
import { Public } from './decorators/public.decorator.js';
import { ResetPasswordDto } from './dto/reset-password.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto)
  }

  @Post('signout')
  @HttpCode(HttpStatus.NO_CONTENT)
  signout(@Headers('authorization') authorization: string) {
    return this.authService.signout(authorization);
  }

  @Public()
  @Post('reset-password')
  @HttpCode(HttpStatus.ACCEPTED)
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Post('reset-password-confirm')
  @HttpCode(HttpStatus.OK)
  resetPasswordConfirm(@Headers('authorization') authorization: string, @Body() resetPasswordConfirmDto: ResetPasswordConfirmDto) {
    return this.authService.resetPasswordConfirm(authorization, resetPasswordConfirmDto);
  }

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
