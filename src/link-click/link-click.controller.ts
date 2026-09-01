import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LinkClickService } from './link-click.service.js';
import { CreateLinkClickDto } from './dto/create-link-click.dto.js';
import { UpdateLinkClickDto } from './dto/update-link-click.dto.js';

@Controller('link-click')
export class LinkClickController {
  constructor(private readonly linkClickService: LinkClickService) {}

  @Post()
  create(@Body() createLinkClickDto: CreateLinkClickDto) {
    return this.linkClickService.create(createLinkClickDto);
  }

  @Get()
  findAll() {
    return this.linkClickService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.linkClickService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLinkClickDto: UpdateLinkClickDto,
  ) {
    return this.linkClickService.update(+id, updateLinkClickDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.linkClickService.remove(+id);
  }
}
