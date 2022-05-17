import { Test, TestingModule } from '@nestjs/testing';
import { HearthstoneService } from './hearthstone.service';

describe('HearthstoneService', () => {
  let service: HearthstoneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HearthstoneService],
    }).compile();

    service = module.get<HearthstoneService>(HearthstoneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
