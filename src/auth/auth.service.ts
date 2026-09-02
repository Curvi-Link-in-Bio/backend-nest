import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto.js';
import { UpdateAuthDto } from './dto/update-auth.dto.js';
import { SignupDto } from './dto/signup.dto.js';
import { UserService } from '../user/user.service.js';
import { User } from '../user/entities/user.entity.js';
import { PlanEnum } from '../user/enums/plan.enum.js';
import { ThemeEnum } from '../user/enums/theme.enum.js';
import { PaymentMethodEnum } from '../user/enums/paymentMethod.enum.js';
import { compare, hash } from 'bcrypt';
import { SigninDto } from './dto/signin.dto.js';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async signup(signupDto: SignupDto) {
    const newUser = new User();
    newUser.email = signupDto.email.trim().toLowerCase();
    newUser.password = await hash(signupDto.password, 10);
    newUser.username = signupDto.username.trim().toLowerCase();
    newUser.displayName = signupDto.username.trim().toLowerCase().replaceAll(' ', '-');
    newUser.theme = ThemeEnum.GOLD_NOIR;
    newUser.buttonColor = '#D4AF37';
    newUser.backgroundColor = '#18181B';
    newUser.plan = PlanEnum.FREE;
    newUser.paymentMethod = PaymentMethodEnum.CREDIT;

    const response = await this.userService.create(newUser);

    return {
      id: response.id,
      email: response.email,
      username: response.username,
      displayName: response.displayName,
    };
  }

  async signin(signinDto: SigninDto) {
    const user = await this.userService.findOneforEmail(signinDto.email.trim().toLowerCase());
    Logger.debug(`User found: ${JSON.stringify(user, null, 2)}`, 'AuthService.signin');

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (!(await compare(signinDto.password, user.password))) {
      throw new BadRequestException('Invalid password');
    }

    Logger.debug(`User authenticated: ${JSON.stringify(user, null, 2)}`, 'AuthService.signin');

    const payload = { sub: user.id, email: user.email, username: user.username, displayName: user.displayName,
      plan: user.plan,
    };
    
    Logger.debug(`JWT Payload: ${JSON.stringify(payload, null, 2)}`, 'AuthService.signin');
    const jwtToken = await this.jwtService.signAsync(payload);
    Logger.debug(`JWT Token generated: ${jwtToken}`, 'AuthService.signin');

    return {
      accessToken: jwtToken,
    };
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
