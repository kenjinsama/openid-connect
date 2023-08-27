import { ValidationOptions, registerDecorator } from 'class-validator';

export function validate(value: unknown) {
  if (!Array.isArray(value)) {
    return false;
  }

  if (value.includes('token') && !value.includes('id_token')) {
    return false;
  }

  return true;
}

export function defaultMessage() {
  return 'Can\'t use "token" response type without "id_token" response type. See https://openid.net/specs/openid-connect-core-1_0.html#rfc.section.3.2.2.1';
}

/**
 * @see https://openid.net/specs/openid-connect-core-1_0.html#rfc.section.3.2.2.1
 */
// Declarative code only
/* istanbul ignore next */
export function IsNotForbiddenResponseType(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return function (object: Object, propertyName: string | Symbol) {
    registerDecorator({
      name: 'isNotForbiddenResponseType',
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
