import { Test, TestingModule } from '@nestjs/testing';
import { LinkClickController } from './link-click.controller.js';
import { LinkClickService } from './link-click.service.js';

describe('LinkClickController', () => {
  let controller: LinkClickController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LinkClickController],
      providers: [LinkClickService],
    }).compile();

    controller = module.get<LinkClickController>(LinkClickController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
