import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module.js';
import { User } from './user/entities/user.entity.js';
import { LinkModule } from './link/link.module.js';
import { Link } from './link/entities/link.entity.js';
import { LinkClickModule } from './link-click/link-click.module.js';
import { LinkClick } from './link-click/entities/link-click.entity.js';
import { ReviewModule } from './review/review.module.js';
import { Review } from './review/entities/review.entity.js';
import { PendingCheckoutModule } from './pending-checkout/pending-checkout.module.js';
import { PendingCheckout } from './pending-checkout/entities/pending-checkout.entity.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST_DB,
      port: Number(process.env.PORT_DB),
      username: process.env.USERNAME_DB,
      password: process.env.PASSWORD_DB,
      database: process.env.NAME_DB,
      entities: [User, Link, LinkClick, Review, PendingCheckout],
      synchronize: true,
    }),
    UserModule,
    LinkModule,
    LinkClickModule,
    ReviewModule,
    PendingCheckoutModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
