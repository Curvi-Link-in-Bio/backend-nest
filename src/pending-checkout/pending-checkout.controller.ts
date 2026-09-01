import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PendingCheckoutService } from './pending-checkout.service.js';
import { CreatePendingCheckoutDto } from './dto/create-pending-checkout.dto.js';
import { UpdatePendingCheckoutDto } from './dto/update-pending-checkout.dto.js';

@Controller('pending-checkout')
export class PendingCheckoutController {
  constructor(
    private readonly pendingCheckoutService: PendingCheckoutService,
  ) {}

  @Post()
  create(@Body() createPendingCheckoutDto: CreatePendingCheckoutDto) {
    return this.pendingCheckoutService.create(createPendingCheckoutDto);
  }

  @Get()
  findAll() {
    return this.pendingCheckoutService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pendingCheckoutService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePendingCheckoutDto: UpdatePendingCheckoutDto,
  ) {
    return this.pendingCheckoutService.update(+id, updatePendingCheckoutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pendingCheckoutService.remove(+id);
  }
}
