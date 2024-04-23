import { ContextLevel } from './context_level';

describe('#isValid', () => {
  test('should return true when context is valid portfolio', () => {
    const contextLevel = new ContextLevel('1');
    expect(contextLevel.isValid()).toBeTruthy();
  });

  test('should return true when context is valid initiative', () => {
    const contextLevel = new ContextLevel('1.1');
    expect(contextLevel.isValid()).toBeTruthy();
  });

  test('should return true when context is valid team', () => {
    const contextLevel = new ContextLevel('1.1.1');
    expect(contextLevel.isValid()).toBeTruthy();
  });

  test('should return false when context is blank', () => {
    const contextLevel = new ContextLevel('');
    expect(contextLevel.isValid()).toBeFalsy();
  });

  test('should return false when context is invalid', () => {
    const contextLevel = new ContextLevel('1.1x.1');
    expect(contextLevel.isValid()).toBeFalsy();
  });
});
