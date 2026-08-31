import { Test, TestingModule } from '@nestjs/testing';
import { LinkController } from './link.controller.js';
import { LinkService } from './link.service.js';

describe('LinkController', () => {
  let controller: LinkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LinkController],
      providers: [LinkService],
    }).compile();

    controller = module.get<LinkController>(LinkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
