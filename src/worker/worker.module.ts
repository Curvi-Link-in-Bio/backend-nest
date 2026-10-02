import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service.js';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module.js';
import { NodemailerModule } from '../nodemailer/nodemailer.module.js';
import { RedisModule } from '../redis/redis.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link } from '../link/entities/link.entity.js';
import { LinkClick } from '../link-click/entities/link-click.entity.js';

@Module({
    imports: [RabbitmqModule, NodemailerModule, RedisModule, TypeOrmModule.forFeature([Link, LinkClick])],
    providers: [WorkerService],
})
export class WorkerModule {}
