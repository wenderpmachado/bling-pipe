import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { PipedriveHttpService } from './pipedrive.http.service';
import { PipedriveService } from './pipedrive.service';

describe('PipedriveService', () => {
  let service: PipedriveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        PipedriveService,
        PipedriveHttpService
      ],
    }).compile();

    service = module.get<PipedriveService>(PipedriveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find opportunities', async (done) => {
    const result = await service.findDeals();
    expect(service).toBeDefined();
    done();
  });
});
