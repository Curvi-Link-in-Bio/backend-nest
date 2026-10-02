import { Module } from '@nestjs/common';
import { LinkClickService } from './link-click.service.js';
import { LinkClickController } from './link-click.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkClick } from './entities/link-click.entity.js';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module.js';
import { Link } from '../link/entities/link.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([LinkClick, Link]), RabbitmqModule],
  controllers: [LinkClickController],
  providers: [LinkClickService],
})
export class LinkClickModule {}
