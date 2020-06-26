import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpExceptionFilter } from './http-exception-filter.filter';

const mockJson = jest.fn();
const mockStatus = jest.fn().mockImplementation(() => ({ json: mockJson }));

const mockGetResponse = jest.fn().mockImplementation(() => ({ status: mockStatus }));
const mockHttpArgumentsHost = jest.fn().mockImplementation(() => ({ getResponse: mockGetResponse }));

const mockArgumentsHost = {
  switchToHttp: mockHttpArgumentsHost,
  getArgByIndex: jest.fn(),
  getArgs: jest.fn(),
  getType: jest.fn(),
  switchToRpc: jest.fn(),
  switchToWs: jest.fn()
};

describe('HttpExceptionFilterFilter', () => {
  let filter: HttpExceptionFilter<any>;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HttpExceptionFilter
      ]
    }).compile();
    filter = module.get<HttpExceptionFilter<any>>(HttpExceptionFilter);
  });

  it('should be defined', () => {
    expect(filter).toBeDefined();
  });

  it('should catch exception', () => {
    filter.catch(
      new HttpException('Http exception', HttpStatus.BAD_REQUEST),
      mockArgumentsHost
    );
    expect(mockHttpArgumentsHost).toBeCalledTimes(1);
    expect(mockHttpArgumentsHost).toBeCalledWith();
    expect(mockGetResponse).toBeCalledTimes(1);
    expect(mockGetResponse).toBeCalledWith();
    expect(mockStatus).toBeCalledTimes(1);
    expect(mockStatus).toBeCalledWith(HttpStatus.BAD_REQUEST);
    expect(mockJson).toBeCalledTimes(1);
    expect(mockJson).toBeCalledWith(
      expect.objectContaining({
        statusMessage: 'Http exception',
        statusCode: HttpStatus.BAD_REQUEST
      })
    );
  });
});
