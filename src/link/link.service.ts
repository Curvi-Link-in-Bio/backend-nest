import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto.js';
import { UpdateLinkDto } from './dto/update-link.dto.js';
import { Repository } from 'typeorm';
import { Link } from './entities/link.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity.js';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepository: Repository<Link>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findLinksByUserId(userId: string) {
    const userExists = await this.userRepository.findOne({
      where: {
        id: userId,
        deleted: false,
      },
    });

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    const links = await this.linkRepository.find({
      where: {
        user: {
          id: userId,
        },
        deleted: false,
      },
      order: {
        position: 'ASC',
      },
    });

    return links;
  }

  async createLinkByUserId(userId: string, createLinkDto: CreateLinkDto) {
    const userExists = await this.userRepository.findOne({
      where: {
        id: userId,
        deleted: false,
      },
    });

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    const newLink = new Link();
    newLink.user = userExists;
    newLink.title = createLinkDto.title;
    newLink.url = createLinkDto.url;
    newLink.active = createLinkDto.active;
    newLink.clicks = 0;
    newLink.category = createLinkDto.category;
    newLink.position = createLinkDto.position;


    const savedLink = await this.linkRepository.save(newLink);

    return {
      id: savedLink.id,
      title: savedLink.title,
      url: savedLink.url,
      active: savedLink.active,
    }
  }

  async updateLinkByIdAndUserId(linkId: string, userId: string, updateLinkDto: UpdateLinkDto) {
    const link = await this.linkRepository.findOne({
      where: {
        id: linkId,
        user: {
          id: userId,
        },
        deleted: false,
      },
    });

    if (!link) {
      throw new NotFoundException('Link not found');
    }

    if (updateLinkDto.title !== undefined) {
      link.title = updateLinkDto.title;
    }
    if (updateLinkDto.url !== undefined) {
      link.url = updateLinkDto.url;
    }
    if (updateLinkDto.active !== undefined) {
      link.active = updateLinkDto.active;
    }
    if (updateLinkDto.category !== undefined) {
      link.category = updateLinkDto.category;
    }
    if (updateLinkDto.position !== undefined) {
      link.position = updateLinkDto.position;
    }

    await this.linkRepository.save(link);

    return {
      ok: true
    };
  }

  async deleteLinkByIdAndUserId(linkId: string, userId: string) {
    const link = await this.linkRepository.findOne({
      where: {
        id: linkId,
        user: {
          id: userId,
        },
        deleted: false,
      },
    });

    if (!link) {
      throw new NotFoundException('Link not found');
    }

    link.deleted = true;
    await this.linkRepository.save(link);

    return {
      ok: true,
    };
  }

  async reorderLinksByUserId(userId: string, reorderLinksDto: string[]) {
    const links = await this.linkRepository.find({
      where: {
        user: {
          id: userId,
        },
        deleted: false,
      },
    });

    if (!links || links.length === 0) {
      throw new NotFoundException('No links found for the user');
    }

    const linkMap = new Map(links.map(link => [link.title, link]));

    reorderLinksDto.forEach((linkTitle, index) => {
      const link = linkMap.get(linkTitle);
      if (link) {
        link.position = index;
      }
    });

    await this.linkRepository.save(Array.from(linkMap.values()));

    return {
      ok: true,
    };
  }
}
