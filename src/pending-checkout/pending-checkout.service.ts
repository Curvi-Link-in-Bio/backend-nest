import { Injectable } from '@nestjs/common';
import { CreatePendingCheckoutDto } from './dto/create-pending-checkout.dto.js';
import { UpdatePendingCheckoutDto } from './dto/update-pending-checkout.dto.js';

@Injectable()
export class PendingCheckoutService {
  create(createPendingCheckoutDto: CreatePendingCheckoutDto) {
    return 'This action adds a new pendingCheckout';
  }

  findAll() {
    return `This action returns all pendingCheckout`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pendingCheckout`;
  }

  update(id: number, updatePendingCheckoutDto: UpdatePendingCheckoutDto) {
    return `This action updates a #${id} pendingCheckout`;
  }

  remove(id: number) {
    return `This action removes a #${id} pendingCheckout`;
  }
}
