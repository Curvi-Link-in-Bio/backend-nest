import { Injectable } from '@nestjs/common';
import { CreateLinkClickDto } from './dto/create-link-click.dto.js';
import { UpdateLinkClickDto } from './dto/update-link-click.dto.js';

@Injectable()
export class LinkClickService {
  create(createLinkClickDto: CreateLinkClickDto) {
    return 'This action adds a new linkClick';
  }

  findAll() {
    return `This action returns all linkClick`;
  }

  findOne(id: number) {
    return `This action returns a #${id} linkClick`;
  }

  update(id: number, updateLinkClickDto: UpdateLinkClickDto) {
    return `This action updates a #${id} linkClick`;
  }

  remove(id: number) {
    return `This action removes a #${id} linkClick`;
  }
}
