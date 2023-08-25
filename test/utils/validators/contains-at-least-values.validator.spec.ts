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
    const mandatoryValuesMock = ['value1', 'value2'];

    it('should return false if the value is not a string', () => {
      // Given
      const value = 123;

      // When
      const result = validate(value, {
        constraints: [mandatoryValuesMock],
      } as ValidationArguments);

      // Then
      expect(result).toBe(false);
    });

    it('should return true if the value contains at least values that are in the mandatory values', () => {
      // Given
      const value = ['value1', 'value2', 'value3'];

      // When
      const result = validate(value, {
        constraints: [mandatoryValuesMock],
      } as ValidationArguments);

      // Then
      expect(result).toBe(true);
    });

    it('should return false if the value miss at least one of mandatory values', () => {
      // Given
      const value = ['value1', 'value4'];

      // When
      const result = validate(value, {
        constraints: [mandatoryValuesMock],
      } as ValidationArguments);

      // Then
      expect(result).toBe(false);
    });
  });

  describe('defaultMessage', () => {
    const mandatoryValuesMock = ['value1', 'value2', 'value3'];

    it('should return the default message', () => {
      // Given
      const args = {
        property: 'property',
        value: ['value'],
        constraints: [mandatoryValuesMock],
      } as ValidationArguments;

      // When
      const result = defaultMessage(args);

      // Then
      expect(result).toBe(
        `Missing values in ${args.property}: ${args.value.join(
          ', ',
        )}. Mandatory values: ${mandatoryValuesMock.join(', ')}`,
      );
    });
  });
});
