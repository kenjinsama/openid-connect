import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

export function validate(value: unknown, args: ValidationArguments) {
  const [allowedValues] = args.constraints as [string[]];

  if (!Array.isArray(value)) {
    return false;
  }

  return value.every(
    value => typeof value === 'string' && allowedValues.includes(value),
  );
}

export function defaultMessage(args: ValidationArguments) {
  const [allowedValues] = args.constraints as [string[]];

  return `Invalid values in ${args.property}: ${args.value.join(
    ', ',
  )}. Allowed values: ${allowedValues.join(', ')}`;
}

// Declarative code only
/* istanbul ignore next */
export function ContainsOnlyValuesIn(
  allowedValues: string[],
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return function (object: Object, propertyName: string | Symbol) {
    registerDecorator({
      name: 'containsOnlyValuesIn',
      target: object.constructor,
      propertyName: propertyName.toString(),
      constraints: [allowedValues],
      options: validationOptions,
      validator: {
        validate,
        defaultMessage,
      },
    });
  };
}
