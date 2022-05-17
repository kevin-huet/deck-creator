import { Test, TestingModule } from '@nestjs/testing';
import { HearthstoneController } from './hearthstone.controller';

describe('HearthstoneController', () => {
  let controller: HearthstoneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HearthstoneController],
    }).compile();

    controller = module.get<HearthstoneController>(HearthstoneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
