import { Test, TestingModule } from '@nestjs/testing';
import { SpectatorService } from './spectator.service';

describe('SpectatorService', () => {
  let service: SpectatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpectatorService],
    }).compile();

    service = module.get<SpectatorService>(SpectatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
