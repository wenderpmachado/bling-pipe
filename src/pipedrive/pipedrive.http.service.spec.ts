import { ConfigService, ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PipedriveHttpService } from './pipedrive.http.service';

describe('PipedriveHttpService', () => {
  let service: PipedriveHttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot()
      ],
      providers: [
        ConfigService,
        PipedriveHttpService
      ],
    }).compile();

    service = module.get<PipedriveHttpService>(PipedriveHttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
