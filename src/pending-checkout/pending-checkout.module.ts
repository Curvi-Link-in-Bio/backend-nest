import { Module } from '@nestjs/common';
import { PendingCheckoutService } from './pending-checkout.service.js';
import { PendingCheckoutController } from './pending-checkout.controller.js';

@Module({
  controllers: [PendingCheckoutController],
  providers: [PendingCheckoutService],
})
export class PendingCheckoutModule {}
