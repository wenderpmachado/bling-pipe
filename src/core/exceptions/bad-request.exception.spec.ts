import { ExternalBadRequestException } from './bad-request.exception';

describe('ExternalBadRequestException', () => {
  let exception: ExternalBadRequestException;

  beforeEach(async () => {
    exception = new ExternalBadRequestException('Test');
  });

  it('should initialize', () => {
    expect(exception).toBeDefined();
    expect(exception.getResponse()).toBeDefined();
    expect(exception.getStatus()).toBeDefined();
  });
});
