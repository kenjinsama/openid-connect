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
    const optionsMock = { separator: ',' };
    const allowedValuesMock = ['value1', 'value2', 'value3'];

    it('should return false if the value is not a string', () => {
      // Given
      const value = 123;

      // When
      const result = validate(value, {
        constraints: [allowedValuesMock, optionsMock],
      } as ValidationArguments);

      // Then
      expect(result).toBe(false);
    });

    it('should return true if the value contains only values that are in the allowed values', () => {
      // Given
      const value = 'value1,value2,value3';

      // When
      const result = validate(value, {
        constraints: [allowedValuesMock, optionsMock],
      } as ValidationArguments);

      // Then
      expect(result).toBe(true);
    });

    it('should return true with a RegExp as separator if the value contains only values that are in the allowed values', () => {
      // Given
      const value = 'value1,value2,value3';

      // When
      const result = validate(value, {
        constraints: [allowedValuesMock, { ...optionsMock, separator: /,/ }],
      } as ValidationArguments);

      // Then
      expect(result).toBe(true);
    });

    it('should return false if the value contains a value that is not in the allowed values', () => {
      // Given
      const value = 'value1,value2,value4';

      // When
      const result = validate(value, {
        constraints: [allowedValuesMock, optionsMock],
      } as ValidationArguments);

      // Then
      expect(result).toBe(false);
    });

    it('should trim by default and return true if the value contains only values that are in the allowed values and there are leading, inter or trailing spaces', () => {
      // Given
      const value = '  value1, value2 , value3  ';

      // When
      const result = validate(value, {
        constraints: [allowedValuesMock, optionsMock],
      } as ValidationArguments);

      // Then
      expect(result).toBe(true);
    });

    it('should return false if trim is false and there are leading or trailing spaces and the value contains a value that is not in the allowed values', () => {
      // Given
      const value = '  value1,value2,value3  ';

      // When
      const result = validate(value, {
        constraints: [allowedValuesMock, { ...optionsMock, trim: false }],
      } as ValidationArguments);

      // Then
      expect(result).toBe(false);
    });

    it('should return true if the value contains only values that are in the allowed values and trim is false and the value contains a value that is in the allowed values', () => {
      // Given
      const value = 'value1,value2,value3';

      // When
      const result = validate(value, {
        constraints: [allowedValuesMock, { ...optionsMock, trim: false }],
      } as ValidationArguments);

      // Then
      expect(result).toBe(true);
    });

    it('should return false if trim is false and there are leading or trailing space on internal values and the value contains a value that is not in the allowed values', () => {
      // Given
      const value = 'value1, value2, value3';

      // When
      const result = validate(value, {
        constraints: [allowedValuesMock, { ...optionsMock, trim: false }],
      } as ValidationArguments);

      // Then
      expect(result).toBe(false);
    });

    it('should return true and limit the number of values if a limit is provided and the limited value contains only values that are in the allowed values', () => {
      // Given
      const value = 'value1,value2,value4';

      // When
      const result = validate(value, {
        constraints: [allowedValuesMock, { ...optionsMock, limit: 2 }],
      } as ValidationArguments);

      // Then
      expect(result).toBe(true);
    });
  });

  describe('defaultMessage', () => {
    const optionsMock = { separator: ',', trim: true };
    const allowedValuesMock = ['value1', 'value2', 'value3'];

    it('should return the default message', () => {
      // Given
      const args = {
        property: 'someProperty',
        value: 'value1,value2,value4',
        constraints: [allowedValuesMock, optionsMock],
      } as ValidationArguments;

      // When
      const result = defaultMessage(args);

      // Then
      expect(result).toBe(
        'Invalid values in someProperty: value1,value2,value4. Allowed values: value1, value2, value3',
      );
    });
  });
});
