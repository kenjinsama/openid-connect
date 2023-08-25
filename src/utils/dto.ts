import { instanceToPlain } from 'class-transformer';
import { validateOrReject } from 'class-validator';

export class Dto {
  async validate() {
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
