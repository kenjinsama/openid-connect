/* istanbul ignore file */

// Declarative file
import { Expose } from 'class-transformer';
import { IsBoolean } from 'class-validator';

import { Dto } from '../../../utils/dto';
import { Plain } from '../../../utils/types/plain.type';

export class FeaturesDto extends Dto {
  @Expose()
  @IsBoolean()
  readonly userinfo: boolean;

  override toPlainObject<T = Features>(): T {
    return super.toPlainObject<T>();
  }
}

export type Features = Plain<FeaturesDto>;
