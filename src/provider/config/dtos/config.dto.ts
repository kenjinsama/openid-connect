/* istanbul ignore file */

// Declarative file
import { Expose, Type } from 'class-transformer';
import { IsUrl, ValidateNested } from 'class-validator';

import { Dto } from '../../../utils/dto';
import { Plain } from '../../../utils/types/plain.type';
import { RefParent } from '../../../utils/validate-if-parent';
import { EndpointDto } from './endpoints.dto';
import { FeaturesDto } from './features.dto';
import { ClientDto } from './service-provider.dto';

export class ConfigDto extends Dto {
  @Expose()
  @IsUrl()
  readonly issuer: string;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => ClientDto)
  readonly clients: ClientDto[];

  @Expose()
  @RefParent()
  @ValidateNested()
  @Type(() => EndpointDto)
  readonly endpoints: EndpointDto;

  @Expose()
  @ValidateNested()
  @Type(() => FeaturesDto)
  readonly features: FeaturesDto;
}

export type Config = Plain<ConfigDto>;
