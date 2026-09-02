import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { UserService } from '../user/user.service.js';
import { UserModule } from '../user/user.module.js';
import { JwtModule } from '@nestjs/jwt';
import { RedisService } from '../redis/redis.service.js';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard.js';

@Module({
  imports: [UserModule, JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),],
  controllers: [AuthController],
  providers: [AuthService, RedisService, {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },],
})
export class AuthModule {}
