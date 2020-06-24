import { InternalServerErrorException } from './internal-server-error.exception';

describe('InternalServerErrorException', () => {
  let exception: InternalServerErrorException;

  beforeEach(async () => {
    exception = new InternalServerErrorException();
  });

  it('should initialize', () => {
    expect(exception).toBeDefined();
    expect(exception.getResponse()).toBeDefined();
    expect(exception.getStatus()).toBeDefined();
  });
});
