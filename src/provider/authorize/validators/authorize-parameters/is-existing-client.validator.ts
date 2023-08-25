import { ValidationOptions, registerDecorator } from 'class-validator';
import { ValidationArgumentsGeneric } from '../../../../utils/types/validation-arguments-generic.type';
import { Client } from '../../../config/dtos/service-provider.dto';
import { AuthorizeParametersDto } from '../../dtos/authorize-parameters.dto';

export function validate(
  value: string,
  { object }: ValidationArgumentsGeneric<AuthorizeParametersDto>,
) {
  const client: Client | undefined = Reflect.getMetadata('__client', object);

  return Boolean(client);
}

export function defaultMessage(
  args: ValidationArgumentsGeneric<AuthorizeParametersDto>,
) {
  return `"${args.object[args.property]}" is an not an existing client`;
}

// Declarative code only
/* istanbul ignore next */
export function IsExistingClient(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return function (object: Object, propertyName: string | Symbol) {
    registerDecorator({
      name: 'isExistingClient',
      target: object.constructor,
      propertyName: propertyName.toString(),
      constraints: [],
      options: validationOptions,
      validator: {
        validate,
        defaultMessage,
      },
    });
  };
}
