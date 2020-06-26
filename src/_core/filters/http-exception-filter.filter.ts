import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException> extends BaseExceptionFilter {
  catch(exception: T, host: ArgumentsHost): Response<any> {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();
    const statusCode = exception.getStatus();
    const statusMessage = exception.getResponse();

    const body = {
      statusCode,
      statusMessage,
      timestamp: new Date().toISOString()
    }

    return response.status(statusCode).json(body);
  }
}
