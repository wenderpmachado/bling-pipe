import { Module } from '@nestjs/common';

import { BlingHttpService } from './bling.http.service';
import { BlingService } from './bling.service';

@Module({
  providers: [
    BlingService,
    BlingHttpService
  ]
})
export class BlingModule {}
