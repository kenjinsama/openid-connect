import { ValidationError } from 'class-validator';

export function RefParent() {
  return function (target: unknown, targetKey: string) {
    let value: unknown;

    const getter = function (this: unknown) {
      return value;
    };

    const setter = function (this: unknown, newValue: object) {
      value = newValue;

      Reflect.defineMetadata('__parent', this, newValue);
    };

    Object.defineProperty(target, targetKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}

export function Parent<T = unknown>(
  condition: (parent: T, value: unknown) => boolean,
) {
  return (object: object, value: unknown) => {
    const parent = Reflect.getMetadata('__parent', object);

    if (!parent) {
      const error = new ValidationError();

      error.constraints = {
        [object.constructor.name]:
          'Parent not found, did you forget to use @RefParent() ?',
      };

      throw error;
    }

    return condition(parent, value);
  };
}
