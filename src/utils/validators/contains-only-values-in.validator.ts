import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

export interface ContainsOnlyValuesInOptions {
  separator: string | RegExp;
  trim?: boolean;
  limit?: number;
}

export function validate(value: unknown, args: ValidationArguments) {
  const [allowedValues, { separator, trim = true, limit }] =
    args.constraints as [string[], ContainsOnlyValuesInOptions];

  if (typeof value !== 'string') {
    return false;
  }

  const splitValues = (trim ? value.trim() : value).split(separator, limit);

  return splitValues.every(value =>
    allowedValues.includes(trim ? value.trim() : value),
  );
}

export function defaultMessage(args: ValidationArguments) {
  const [allowedValues] = args.constraints as [string[]];

  return `Invalid values in ${args.property}: ${
    args.value
  }. Allowed values: ${allowedValues.join(', ')}`;
}

// Declarative code only
/* istanbul ignore next */
export function ContainsOnlyValuesIn(
  allowedValues: string[],
  options: ContainsOnlyValuesInOptions,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return function (object: Object, propertyName: string | Symbol) {
    registerDecorator({
      name: 'containsOnlyValuesIn',
      target: object.constructor,
      propertyName: propertyName.toString(),
      constraints: [allowedValues, options],
      options: validationOptions,
      validator: {
        validate,
        defaultMessage,
      },
    });
  };
}
