/* istanbul ignore file */

// Declarative file
import { IsBoolean } from 'class-validator';

import { Dto } from '../../../utils/dto';

export class FeaturesDto extends Dto {
  @IsBoolean()
  readonly userinfo: boolean;
}
