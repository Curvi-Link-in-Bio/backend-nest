import { Test, TestingModule } from '@nestjs/testing';
import { LinkClickService } from './link-click.service.js';

describe('LinkClickService', () => {
  let service: LinkClickService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LinkClickService],
    }).compile();

    service = module.get<LinkClickService>(LinkClickService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
