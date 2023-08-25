import { instanceToPlain } from 'class-transformer';
import { validateOrReject } from 'class-validator';

export class Dto {
  // Need this to override the with different parameters on child classes
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async validate(..._args: unknown[]) {
    console.debug(`Validating ${this.constructor.name}...`);
    try {
      await validateOrReject(this, {
        whitelist: true,
        forbidNonWhitelisted: true,
      });
    } catch (errors) {
      console.debug(JSON.stringify(errors, null, 2));

      throw errors;
    }
  }

  toPlainObject<T = unknown>(): T {
    return instanceToPlain(this) as T;
  }
}
