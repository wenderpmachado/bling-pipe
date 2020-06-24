import { Module, HttpModule } from '@nestjs/common';
import { PipedriveService } from './pipedrive.service';
import { PipedriveHttpService } from './pipedrive.http.service';
import { PipedriveController } from './pipedrive.controller';

@Module({
  imports: [
    HttpModule.registerAsync({
      useClass: PipedriveHttpService,
    })
  ],
  providers: [
    PipedriveService
  ],
  controllers: [PipedriveController]
})
export class PipedriveModule {}
