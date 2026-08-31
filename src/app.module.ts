import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module.js';
import { User } from './user/entities/user.entity.js';
import { LinkModule } from './link/link.module.js';
import { Link } from './link/entities/link.entity.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST_DB,
      port: Number(process.env.PORT_DB),
      username: process.env.USERNAME_DB,
      password: process.env.PASSWORD_DB,
      database: process.env.NAME_DB,
      entities: [
        User,
        Link,
      ],
      synchronize: true,
    }),
    UserModule,
    LinkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
