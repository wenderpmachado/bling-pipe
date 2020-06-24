import { NoContentException } from './no-content.exception';

describe('NoContentException', () => {
  let exception: NoContentException;

  beforeEach(async () => {
    exception = new NoContentException();
  });

  it('should initialize', () => {
    expect(exception).toBeDefined();
    expect(exception.getResponse()).toBeDefined();
    expect(exception.getStatus()).toBeDefined();
  });
});
