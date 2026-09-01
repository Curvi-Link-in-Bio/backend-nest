import { Test, TestingModule } from '@nestjs/testing';
import { PendingCheckoutController } from './pending-checkout.controller.js';
import { PendingCheckoutService } from './pending-checkout.service.js';

describe('PendingCheckoutController', () => {
  let controller: PendingCheckoutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PendingCheckoutController],
      providers: [PendingCheckoutService],
    }).compile();

    controller = module.get<PendingCheckoutController>(
      PendingCheckoutController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
