/* istanbul ignore file */

// Declarative file
import { Expose } from 'class-transformer';
import { IsBoolean } from 'class-validator';

import { Dto } from '../../../utils/dto';

export class FeaturesDto extends Dto {
  @Expose()
  @IsBoolean()
  readonly userinfo: boolean;
}
