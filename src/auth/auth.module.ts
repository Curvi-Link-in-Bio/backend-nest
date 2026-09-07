import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { UserModule } from '../user/user.module.js';
import { JwtModule } from '@nestjs/jwt';
import { RedisService } from '../redis/redis.service.js';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard.js';
import { RedisModule } from '../redis/redis.module.js';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module.js';

@Module({
  imports: [UserModule, RedisModule, RabbitmqModule, JwtModule.register({
      global: true,
      secret: process.env.CURVI_JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),],
  controllers: [AuthController],
  providers: [AuthService, {
    provide: APP_GUARD,
    useClass: AuthGuard,
  }],
})
export class AuthModule {}
