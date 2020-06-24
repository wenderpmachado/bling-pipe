import { PipedriveService } from './pipedrive.service';
import { Test, TestingModule } from '@nestjs/testing';
import { PipedriveController } from './pipedrive.controller';

describe('Pipedrive Controller', () => {
  let controller: PipedriveController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [
        PipedriveController
      ],
      providers: [
        PipedriveService
      ]
    }).compile();

    controller = module.get<PipedriveController>(PipedriveController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
