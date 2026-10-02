import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLinkClickDto } from './dto/create-link-click.dto.js';
import { UpdateLinkClickDto } from './dto/update-link-click.dto.js';
import { LinkClick } from './entities/link-click.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import type { GroupType } from './types/group.type.js';
import { Repository } from 'typeorm';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service.js';
import { ExchangeEnum } from '../rabbitmq/enums/exchange.enum.js';
import { RoutingKeyEnum } from '../rabbitmq/enums/routing-key.enum.js';
import { LinkService } from '../link/link.service.js';
import { Link } from '../link/entities/link.entity.js';

@Injectable()
export class LinkClickService {
  constructor(
    @InjectRepository(LinkClick)
    private readonly linkClickRepository: Repository<LinkClick>,
    private readonly rabbitmqService: RabbitmqService,
    @InjectRepository(Link)
    private readonly linkRepository: Repository<Link>,
  ) {}
  
  async addClickByUsernameAndLinkId(username: string, linkId: string) {
    const link = await this.linkRepository.findOne({
      where: { id: linkId, deleted: false, user: { username } },
    });

    if (!link) {
      throw new NotFoundException(`Link not found for user: ${username}, linkId: ${linkId}`);
    }

    const msg = { username, linkId };
    const stringifiedMsg = JSON.stringify(msg);

    await this.rabbitmqService.publishToExchange(ExchangeEnum.DIRECT, RoutingKeyEnum.ADD_CLICK, stringifiedMsg);

    return { url: link.url };
  }

  async getMetricsByUserId(userId: string, group?: GroupType) {
    const metrics = await this.linkRepository.find({
      where: { user: { id: userId }, deleted: false },
      relations: {
        linkClicks: true
      }
    });

    return metrics;
  }
}

