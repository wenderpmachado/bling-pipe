import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PipedriveService } from './pipedrive.service';

describe('PipedriveService', () => {
  let service: PipedriveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        PipedriveService
      ],
    }).compile();

    service = module.get<PipedriveService>(PipedriveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
