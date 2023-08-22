/* istanbul ignore file */

// Declarative file
import { Type } from 'class-transformer';
import { IsUrl, ValidateNested } from 'class-validator';

import { Dto } from '../../../dto';
import { Plain } from '../../../plain.type';
import { RefParent } from '../../../utils/validate-if-parent';
import { EndpointDto } from './endpoints.dto';
import { FeaturesDto } from './features.dto';
import { ClientDto } from './service-provider.dto';

export class ConfigDto extends Dto {
  @IsUrl()
  readonly issuer: string;

  @ValidateNested({ each: true })
  @Type(() => ClientDto)
  readonly clients: ClientDto[];

  @RefParent()
  @ValidateNested()
  @Type(() => EndpointDto)
  readonly endpoints: EndpointDto;

  @ValidateNested()
  @Type(() => FeaturesDto)
  readonly features: FeaturesDto;
}

export type Config = Plain<ConfigDto>;