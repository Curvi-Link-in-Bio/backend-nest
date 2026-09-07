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
import { RedisService } from '../redis/redis.service.js';
import { RedisKey } from '../redis/enum/redis-key.enum.js';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service.js';
import { ExchangeEnum } from '../rabbitmq/enums/exchange.enum.js';
import { RoutingKeyEnum } from '../rabbitmq/enums/routing-key.enum.js';
import { ResetPasswordDto } from './dto/reset-password.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly rabbitmqService: RabbitmqService,
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

    if (!(await compare(signinDto.password, user.password))) {
      throw new BadRequestException('Invalid password');
    }

    const payload = {
      sub: user.id, email: user.email, plan: user.plan,
    };

    const token = await this.jwtService.signAsync(payload);

    await this.redisService.set(`${RedisKey.USER_SESSION}:${user.id}`, token);

    delete (user as any).password;
    delete (user as any).deleted;
    delete (user as any).createdAt;
    delete (user as any).updatedAt;

    return {
      user,
      token,
    };
  }

  async signout(authorization: string) {
    const token = authorization?.replace('Bearer ', '');
    const payload = this.jwtService.decode(token);

    await this.redisService.del(`${RedisKey.USER_SESSION}:${payload.sub}`);

    return;
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const user = await this.userService.findOneforEmail(resetPasswordDto.email.trim().toLowerCase());
    const exchange = ExchangeEnum.DIRECT;
    const routingKey = RoutingKeyEnum.RESET_PASSWORD;
    const msg = JSON.stringify({ id: user.id, email: user.email, plan: user.plan });
    
    await this.rabbitmqService.publishToExchange(exchange, routingKey, msg);
    return 'Reset password request sent';
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
