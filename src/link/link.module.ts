import { Module } from '@nestjs/common';
import { LinkService } from './link.service.js';
import { LinkController } from './link.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link } from './entities/link.entity.js';
import { User } from '../user/entities/user.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Link, User])],
  controllers: [LinkController],
  providers: [LinkService],
})
export class LinkModule {}
