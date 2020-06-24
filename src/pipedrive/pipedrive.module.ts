import { Module } from '@nestjs/common';
import { PipedriveService } from './pipedrive.service';

@Module({
  providers: [PipedriveService]
})
export class PipedriveModule {}
