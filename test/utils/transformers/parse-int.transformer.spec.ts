import { ParseInt } from '../../../src/utils/transformers/parse-int.transformer';

describe('ParseInt', () => {
  it('should return a function', () => {
    // When
    const transformer = ParseInt({ base: 10 });

    // Then
    expect(transformer).toBeInstanceOf(Function);
  });

  it('should return undefined if the value is undefined', () => {
    // Given
    const transformer = ParseInt({ base: 10 });
    const value = undefined;

    // When
    const result = transformer({ value, key: 'key' });

    // Then
    expect(result).toBeUndefined();
  });

  it('should throw an error if the value is not a string', () => {
    // Given
    const transformer = ParseInt({ base: 10 });
    const value = 123;

    // When
    const result = () => transformer({ value, key: 'key' });

    // Then
    expect(result).toThrowError('"key" must contains a string.');
  });

  it('should parse a string to an integer', () => {
    // Given
    const transformer = ParseInt();
    const value = '123';

    // When
    const result = transformer({ value, key: 'key' });

    // Then
    expect(result).toBe(123);
  });

  it('should parse a string to an integer with a base', () => {
    // Given
    const transformer = ParseInt({ base: 16 });
    const value = 'ff';

    // When
    const result = transformer({ value, key: 'key' });

    // Then
    expect(result).toBe(255);
  });
});
