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
import { PaymentModule } from './payment/payment.module.js';
import { Payment } from './payment/entities/payment.entity.js';
import { UploadModule } from './upload/upload.module.js';
import { Upload } from './upload/entities/upload.entity.js';
import { AuthModule } from './auth/auth.module.js';
import { RedisService } from './redis/redis.service.js';
import { ScheduleModule } from '@nestjs/schedule';
import { WorkerService } from './worker/worker.service.js';
import { RedisModule } from './redis/redis.module.js';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module.js';
import { NodemailerModule } from './nodemailer/nodemailer.module.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.CURVI_HOST_DB,
      port: Number(process.env.CURVI_PORT_DB),
      username: process.env.CURVI_USERNAME_DB,
      password: process.env.CURVI_PASSWORD_DB,
      database: process.env.CURVI_NAME_DB,
      entities: [
        User,
        Link,
        LinkClick,
        Review,
        PendingCheckout,
        Payment,
        Upload,
      ],
      synchronize: true,
    }),
    UserModule,
    LinkModule,
    LinkClickModule,
    ReviewModule,
    PendingCheckoutModule,
    PaymentModule,
    UploadModule,
    AuthModule,
    ScheduleModule.forRoot(),
    RedisModule,
    RabbitmqModule,
    NodemailerModule,
  ],
  controllers: [AppController],
  providers: [AppService, WorkerService],
})
export class AppModule {}
