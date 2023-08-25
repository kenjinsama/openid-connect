import { ValidationOptions, registerDecorator } from 'class-validator';
import { ValidationArgumentsGeneric } from '../../../../utils/types/validation-arguments-generic.type';
import { Client } from '../../../config/dtos/client.dto';
import { AuthorizeParametersDto } from '../../dtos/authorize-parameters.dto';

export function validate(
  value: unknown,
  { object }: ValidationArgumentsGeneric<AuthorizeParametersDto>,
) {
  if (!Array.isArray(value)) {
    return false;
  }

  const client: Client | undefined = Reflect.getMetadata('__client', object);

  if (!client) {
    return false;
  }

  if (!client.scopes) {
    return true;
  }

  return value.every(value => client.scopes?.includes(value));
}

export function defaultMessage(
  args: ValidationArgumentsGeneric<AuthorizeParametersDto>,
) {
  const client: Client | undefined = Reflect.getMetadata(
    '__client',
    args.object,
  );

  return `"${args.object[args.property as 'scope'].join(
    ', ',
  )}" is an not a valid scope for client "${
    client?.client_id || 'invalid_client'
  }"`;
}

// Declarative code only
/* istanbul ignore next */
export function IsClientAuthorizedScope(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return function (object: Object, propertyName: string | Symbol) {
    registerDecorator({
      name: 'isClientAuthorizedScope',
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
