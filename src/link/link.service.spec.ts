import { Test, TestingModule } from '@nestjs/testing';
import { LinkService } from './link.service.js';

describe('LinkService', () => {
  let service: LinkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LinkService],
    }).compile();

    service = module.get<LinkService>(LinkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
