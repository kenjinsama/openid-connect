import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

export function validate(value: unknown, args: ValidationArguments) {
  const [mandatoryValues] = args.constraints as [string[]];

  if (!Array.isArray(value)) {
    return false;
  }

  return mandatoryValues.every(mandatoryValue =>
    value.includes(mandatoryValue),
  );
}

export function defaultMessage(args: ValidationArguments) {
  const [mandatoryValues] = args.constraints as [string[]];

  return `Missing values in ${args.property}: ${
    args.value
  }. Mandatory values: ${mandatoryValues.join(', ')}`;
}

// Declarative code only
/* istanbul ignore next */
export function ContainsAtLeastValues(
  mandatoryValues: string[],
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return function (object: Object, propertyName: string | Symbol) {
    registerDecorator({
      name: 'containsAtLeastValues',
      target: object.constructor,
      propertyName: propertyName.toString(),
      constraints: [mandatoryValues],
      options: validationOptions,
      validator: {
        validate,
        defaultMessage,
      },
    });
  };
}
