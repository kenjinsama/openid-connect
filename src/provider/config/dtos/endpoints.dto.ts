/* istanbul ignore file */

// Declarative file
import { IsUrl, ValidateIf } from 'class-validator';

import { Dto } from '../../../utils/dto';
import { Parent } from '../../../utils/validate-if-parent';
import { ConfigDto } from './config.dto';

export class EndpointDto extends Dto {
  @IsUrl({ require_host: false })
  readonly authorize: string;

  @IsUrl({ require_host: false })
  readonly token: string;

  @ValidateIf(Parent<ConfigDto>(({ features }) => features.userinfo))
  @IsUrl({ require_host: false })
  readonly userinfo?: string;
}
