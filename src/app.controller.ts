/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller, Get, Redirect } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  @Redirect('/docs')
  @ApiExcludeEndpoint()
  index(): any {}

  @Get('docs')
  @Redirect('/docs')
  @ApiExcludeEndpoint()
  docs(): any {}
}
