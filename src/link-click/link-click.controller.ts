import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  Redirect,
  Query,
} from '@nestjs/common';
import { LinkClickService } from './link-click.service.js';
import { CreateLinkClickDto } from './dto/create-link-click.dto.js';
import { UpdateLinkClickDto } from './dto/update-link-click.dto.js';
import type { GroupType } from './types/group.type.js';

@Controller('link-click')
export class LinkClickController {
  constructor(private readonly linkClickService: LinkClickService) {}

  @Post('user/:username/links/:linkId/click')
  @Redirect('/', HttpStatus.FOUND)
  addClickByUsernameAndLinkId(@Param('username') username: string, @Param('linkId') linkId: string) {
    return this.linkClickService.addClickByUsernameAndLinkId(username, linkId);
  }

  @Get('user/:userId/metrics')
  getMetricsByUserId(@Param('userId') userId: string, @Query('group') group?: GroupType) {
    return this.linkClickService.getMetricsByUserId(userId, group);
  }
}
