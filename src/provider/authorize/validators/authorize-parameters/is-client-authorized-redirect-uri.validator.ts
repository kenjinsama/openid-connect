import { ValidationOptions, registerDecorator } from 'class-validator';
import { ValidationArgumentsGeneric } from '../../../../utils/types/validation-arguments-generic.type';
import { Client } from '../../../config/dtos/client.dto';
import { AuthorizeParametersDto } from '../../dtos/authorize-parameters.dto';

export function validate(
  value: string,
  { object }: ValidationArgumentsGeneric<AuthorizeParametersDto>,
) {
  const client: Client | undefined = Reflect.getMetadata('__client', object);

  return client?.redirect_uris?.includes(value) || false;
}

export function defaultMessage(
  args: ValidationArgumentsGeneric<AuthorizeParametersDto>,
) {
  const client: Client | undefined = Reflect.getMetadata(
    '__client',
    args.object,
  );

  return `"${
    args.object[args.property]
  }" is an not a valid redirect_uri for client "${
    client?.client_id || 'invalid_client'
  }"`;
}

// Declarative code only
/* istanbul ignore next */
export function IsClientAuthorizedRedirectUri(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return function (object: Object, propertyName: string | Symbol) {
    registerDecorator({
      name: 'isClientAuthorizedRedirectUri',
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
