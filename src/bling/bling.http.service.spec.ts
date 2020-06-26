import { ConfigService, ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { BlingHttpService } from './bling.http.service';

describe('BlingHttpService', () => {
  let service: BlingHttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot()
      ],
      providers: [
        ConfigService,
        BlingHttpService
      ],
    }).compile();

    service = module.get<BlingHttpService>(BlingHttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have api getter', () => {
    expect(service.api).toBeDefined();
  });

  describe('should not throw an error', () => {
    let config = { url: 'test' };

    it('with url', () => {
      expect(service.onRequest(config)).not.toThrow();
    })

    it('without url', () => {
      config = { url: null };
      expect(service.onRequest(config)).not.toThrow();
    })
  });
});
