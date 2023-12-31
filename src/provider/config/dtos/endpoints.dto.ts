/* istanbul ignore file */

// Declarative file
import { Expose } from 'class-transformer';
import { IsUrl, ValidateIf } from 'class-validator';

import { Dto } from '../../../utils/dto';
import { Plain } from '../../../utils/types/plain.type';
import { Parent } from '../../../utils/validate-if-parent';
import { ConfigDto } from './config.dto';

export class EndpointDto extends Dto {
  @Expose()
  @IsUrl({ require_host: false })
  readonly authorize: string;

  @Expose()
  @IsUrl({ require_host: false })
  readonly token: string;

  @Expose()
  @ValidateIf(Parent<ConfigDto>(({ features }) => features.userinfo))
  @IsUrl({ require_host: false })
  readonly userinfo?: string;

  override toPlainObject<T = Endpoint>(): T {
    return super.toPlainObject<T>();
  }
}

export type Endpoint = Plain<EndpointDto>;
