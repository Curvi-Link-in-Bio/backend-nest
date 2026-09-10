import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { LinkService } from './link.service.js';
import { CreateLinkDto } from './dto/create-link.dto.js';
import { UpdateLinkDto } from './dto/update-link.dto.js';

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Get('by/:userId')
  findLinksByUserId(@Param('userId') userId: string) {
    return this.linkService.findLinksByUserId(userId);
  }

  @Post('by/:userId')
  createLinkByUserId(@Param('userId') userId: string, @Body() createLinkDto: CreateLinkDto) {
    return this.linkService.createLinkByUserId(userId, createLinkDto);
  }

  @Patch(':linkId/by/:userId')
  updateLinkByIdAndUserId(
    @Param('linkId') linkId: string,
    @Param('userId') userId: string,
    @Body() updateLinkDto: UpdateLinkDto,
  ) {
    return this.linkService.updateLinkByIdAndUserId(linkId, userId, updateLinkDto);
  }

  @Delete(':linkId/by/:userId')
  deleteLinkByIdAndUserId(
    @Param('linkId') linkId: string,
    @Param('userId') userId: string,
  ) {
    return this.linkService.deleteLinkByIdAndUserId(linkId, userId);
  }

  @Post('reorder/by/:userId')
  reorderLinksByUserId(
    @Param('userId') userId: string,
    @Body() reorderLinksDto: string[], // Replace 'any' with the appropriate DTO if available
  ) {
    if (!reorderLinksDto || !Array.isArray(reorderLinksDto)) {
      throw new BadRequestException('Body is string[]');
    }
    
    return this.linkService.reorderLinksByUserId(userId, reorderLinksDto);
  }
}