import { NotFoundException } from './not-found.exception';

describe('NotFoundException', () => {
  let exception: NotFoundException;

  beforeEach(async () => {
    exception = new NotFoundException();
  });

  it('should initialize', () => {
    expect(exception).toBeDefined();
    expect(exception.getResponse()).toBeDefined();
    expect(exception.getStatus()).toBeDefined();
  });
});
