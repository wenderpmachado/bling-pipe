import { InvalidParamException } from './invalid-param.exception';

describe('InvalidParamException', () => {
  let exception: InvalidParamException;

  it('should initialize with values', () => {
    exception = new InvalidParamException('field', 'values');
    expect(exception).toBeDefined();
    expect(exception.getResponse()).toBeDefined();
    expect(exception.getStatus()).toBeDefined();
  });

  it('should initialize without values', () => {
    exception = new InvalidParamException('field');
    expect(exception).toBeDefined();
    expect(exception.getResponse()).toBeDefined();
    expect(exception.getStatus()).toBeDefined();
  });
});
