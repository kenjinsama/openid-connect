/* istanbul ignore file */

// Declarative file
import { IsBoolean } from 'class-validator';

import { Dto } from '../../../dto';

export class FeaturesDto extends Dto {
  @IsBoolean()
  readonly userinfo: boolean;
}
