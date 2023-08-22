import { ValidationArguments } from 'class-validator';
import {
  defaultMessage,
  validate,
} from '../../../src/utils/validators/contains-at-least-values.validator';

describe('ContainsAtLeastValues', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('validate', () => {
    const optionsMock = { separator: ',' };
    const mandatoryValuesMock = ['value1', 'value2'];

    it('should return false if the value is not a string', () => {
      // Given
      const value = 123;

      // When
      const result = validate(value, {
        constraints: [mandatoryValuesMock, optionsMock],
      } as ValidationArguments);

      // Then
      expect(result).toBe(false);
    });

    it('should return true if the value contains at least values that are in the mandatory values', () => {
      // Given
      const value = 'value1,value2,value3';

      // When
      const result = validate(value, {
        constraints: [mandatoryValuesMock, optionsMock],
      } as ValidationArguments);

      // Then
      expect(result).toBe(true);
    });

    it('should return true with a RegExp as separator if the value contains at least values that are in the mandatory values', () => {
      // Given
      const value = 'value1,value2,value3';

      // When
      const result = validate(value, {
        constraints: [mandatoryValuesMock, { ...optionsMock, separator: /,/ }],
      } as ValidationArguments);

      // Then
      expect(result).toBe(true);
    });

    it('should return false if the value miss at least one of mandatory values', () => {
      // Given
      const value = 'value1,value4';

      // When
      const result = validate(value, {
        constraints: [mandatoryValuesMock, optionsMock],
      } as ValidationArguments);

      // Then
      expect(result).toBe(false);
    });

    it('should trim by default and return true if the value contains at least values that are in the mandatory values and there are leading, inter or trailing spaces', () => {
      // Given
      const value = '  value1, value2 , value3  ';

      // When
      const result = validate(value, {
        constraints: [mandatoryValuesMock, optionsMock],
      } as ValidationArguments);

      // Then
      expect(result).toBe(true);
    });

    it('should return false if trim is false and there are leading or trailing spaces and the value miss at least one of the mandatory values', () => {
      // Given
      const value = '  value1,value2,value3  ';

      // When
      const result = validate(value, {
        constraints: [mandatoryValuesMock, { ...optionsMock, trim: false }],
      } as ValidationArguments);

      // Then
      expect(result).toBe(false);
    });

    it('should return true if the value contains at least values that are in the mandatory values and trim is false and the value contains a value that is in the mandatory values', () => {
      // Given
      const value = 'value1,value2,value3';

      // When
      const result = validate(value, {
        constraints: [mandatoryValuesMock, { ...optionsMock, trim: false }],
      } as ValidationArguments);

      // Then
      expect(result).toBe(true);
    });

    it('should return false if trim is false and there are leading or trailing space on internal values and the value miss at least one of the mandatory values', () => {
      // Given
      const value = 'value1, value2, value3';

      // When
      const result = validate(value, {
        constraints: [mandatoryValuesMock, { ...optionsMock, trim: false }],
      } as ValidationArguments);

      // Then
      expect(result).toBe(false);
    });

    it('should return true and limit the number of values if a limit is provided and the limited value contains at least values that are in the mandatory values', () => {
      // Given
      const value = 'value1,value2,value4';

      // When
      const result = validate(value, {
        constraints: [mandatoryValuesMock, { ...optionsMock, limit: 2 }],
      } as ValidationArguments);

      // Then
      expect(result).toBe(true);
    });
  });

  describe('defaultMessage', () => {
    const optionsMock = { separator: ',', trim: true };
    const mandatoryValuesMock = ['value1', 'value2', 'value3'];

    it('should return the default message', () => {
      // Given
      const args = {
        property: 'property',
        value: 'value',
        constraints: [mandatoryValuesMock, optionsMock],
      } as ValidationArguments;

      // When
      const result = defaultMessage(args);

      // Then
      expect(result).toBe(
        `Missing values in ${args.property}: ${
          args.value
        }. Mandatory values: ${mandatoryValuesMock.join(', ')}`,
      );
    });
  });
});
