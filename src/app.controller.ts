/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller, Get, Redirect } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('docs')
  @Redirect('/docs')
  @ApiExcludeEndpoint()
  getDocs(): any {}
}
