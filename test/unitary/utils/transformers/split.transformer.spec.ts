import { Split } from '../../../../src/utils/transformers/split.transformer';

describe('SplitTransformer', () => {
  it('should return a function', () => {
    // When
    const transformer = Split(' ');

    // Then
    expect(transformer).toBeInstanceOf(Function);
  });

  it('should return undefined if the value is undefined', () => {
    // Given
    const separator = ' ';
    const value = undefined;
    const key = 'someProperty';

    // When
    const result = Split(separator)({ value, key });

    // Then
    expect(result).toBeUndefined();
  });

  it('should split a string into an array', () => {
    // Given
    const separator = ' ';
    const value = 'Hello world!';
    const key = 'someProperty';

    // When
    const result = Split(separator)({ value, key });

    // Then
    expect(result).toEqual(['Hello', 'world!']);
  });

  it('should split a string into an array with a limit', () => {
    // Given
    const separator = ' ';
    const limit = 1;
    const value = 'Hello world!';
    const key = 'someProperty';

    // When
    const result = Split(separator, { limit })({ value, key });

    // Then
    expect(result).toEqual(['Hello']);
  });

  it('should split a string into an array with a limit and trim', () => {
    // Given
    const separator = ' ';
    const limit = 1;
    const value = ' Hello world! ';
    const key = 'someProperty';

    // When
    const result = Split(separator, { limit, trim: true })({ value, key });

    // Then
    expect(result).toEqual(['Hello']);
  });

  it('should split a string into an array and trim each string in the array', () => {
    // Given
    const separator = ',';
    const value = 'Hello, world , !';
    const key = 'someProperty';

    // When
    const result = Split(separator)({ value, key });

    // Then
    expect(result).toEqual(['Hello', 'world', '!']);
  });

  it('should split a string into an array and not trim', () => {
    // Given
    const separator = ' ';
    const value = ' Hello world! ';
    const key = 'someProperty';

    // When
    const result = Split(separator, { trim: false })({ value, key });

    // Then
    expect(result).toEqual(['', 'Hello', 'world!', '']);
  });

  it('should split a string into an array given a Regexp', () => {
    // Given
    const separator = /[ ]+/;
    const value = 'Oh...  hi    Mark !';
    const key = 'someProperty';

    // When
    const result = Split(separator)({ value, key });

    // Then
    expect(result).toEqual(['Oh...', 'hi', 'Mark', '!']);
  });

  it('should throw an error if the value is not a string', () => {
    // Given
    const separator = ' ';
    const value = 123;
    const key = 'someProperty';

    // When
    const result = () => Split(separator)({ value, key });

    // Then
    expect(result).toThrowError('"someProperty" must contains a string.');
  });
});
