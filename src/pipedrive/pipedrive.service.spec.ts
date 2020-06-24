import { HttpModule } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PipedriveHttpService } from './pipedrive.http.service';
import { PipedriveService } from './pipedrive.service';

describe('PipedriveService', () => {
  let service: PipedriveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.registerAsync({
          imports: [ConfigModule],
          useClass: PipedriveHttpService,
          inject: [ConfigService]
        })
      ],
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

  it('should find opportunities', async (done) => {
    const result = await service.findOpportunities();
    console.log('result:', result);
    expect(service).toBeDefined();
    done();
  });
});
