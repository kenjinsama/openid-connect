import { instanceToPlain } from 'class-transformer';
import { ValidationError, ValidatorOptions, validate } from 'class-validator';

export class Dto {
  // Need this to override the with different parameters on child classes
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async validate(..._args: unknown[]): Promise<ValidationError[]> {
    console.debug(`Validating ${this.constructor.name}...`);

    const [
      validationOptions = {
        whitelist: true,
        forbidNonWhitelisted: true,
      },
    ] = _args as [ValidatorOptions];

    const validationErrors = await validate(this, validationOptions);

    if (validationErrors.length > 0) {
      console.debug(
        `Validation errors for ${this.constructor.name}:`,
        validationErrors,
      );
    }

    return validationErrors;
  }

  toPlainObject<T = unknown>(): T {
    return instanceToPlain(this) as T;
  }
}
