import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

export interface ContainsAtLeastValuesOptions {
  separator: string | RegExp;
  trim?: boolean;
  limit?: number;
}

export function validate(value: unknown, args: ValidationArguments) {
  const [mandatoryValues, { separator, trim = true, limit }] =
    args.constraints as [string[], ContainsAtLeastValuesOptions];

  if (typeof value !== 'string') {
    return false;
  }

  const splitValues = (trim ? value.trim() : value).split(separator, limit);

  return mandatoryValues.every(value =>
    splitValues.map(value => (trim ? value.trim() : value)).includes(value),
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
  options: ContainsAtLeastValuesOptions,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return function (object: Object, propertyName: string | Symbol) {
    registerDecorator({
      name: 'containsAtLeastValues',
      target: object.constructor,
      propertyName: propertyName.toString(),
      constraints: [mandatoryValues, options],
      options: validationOptions,
      validator: {
        validate,
        defaultMessage,
      },
    });
  };
}
