import { ValidationArguments } from 'class-validator';
import {
  defaultMessage,
  validate,
} from '../../../src/utils/validators/contains-only-values-in.validator';

describe('ContainsOnlyValuesIn', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('validate', () => {
    const allowedValuesMock = ['value1', 'value2', 'value3'];

    it('should return false if the value is not a string', () => {
      // Given
      const value = 123;

      // When
      const result = validate(value, {
        constraints: [allowedValuesMock],
      } as ValidationArguments);

      // Then
      expect(result).toBe(false);
    });

    it('should return true if the value contains only values that are in the allowed values', () => {
      // Given
      const value = ['value1', 'value2', 'value3'];

      // When
      const result = validate(value, {
        constraints: [allowedValuesMock],
      } as ValidationArguments);

      // Then
      expect(result).toBe(true);
    });

    it('should return false if the value contains a value that is not in the allowed values', () => {
      // Given
      const value = ['value1', 'value2', 'value4'];

      // When
      const result = validate(value, {
        constraints: [allowedValuesMock],
      } as ValidationArguments);

      // Then
      expect(result).toBe(false);
    });
  });

  describe('defaultMessage', () => {
    const allowedValuesMock = ['value1', 'value2', 'value3'];

    it('should return the default message', () => {
      // Given
      const args = {
        property: 'someProperty',
        value: ['value1', 'value2', 'value4'],
        constraints: [allowedValuesMock],
      } as ValidationArguments;

      // When
      const result = defaultMessage(args);

      // Then
      expect(result).toBe(
        'Invalid values in someProperty: value1, value2, value4. Allowed values: value1, value2, value3',
      );
    });
  });
});
