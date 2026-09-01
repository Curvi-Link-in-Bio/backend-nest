import { Test, TestingModule } from '@nestjs/testing';
import { PendingCheckoutService } from './pending-checkout.service.js';

describe('PendingCheckoutService', () => {
  let service: PendingCheckoutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PendingCheckoutService],
    }).compile();

    service = module.get<PendingCheckoutService>(PendingCheckoutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
