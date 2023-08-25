/* istanbul ignore file */

// Declarative file
import { Expose, Type } from 'class-transformer';
import { IsUrl, ValidateNested } from 'class-validator';

import { Dto } from '../../../utils/dto';
import { Plain } from '../../../utils/types/plain.type';
import { ReplaceSubset } from '../../../utils/types/replace-subset.type';
import { RefParent } from '../../../utils/validate-if-parent';
import { Endpoint, EndpointDto } from './endpoints.dto';
import { Features, FeaturesDto } from './features.dto';
import { Client, ClientDto } from './service-provider.dto';

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

  override toPlainObject<T = Config>(): T {
    return super.toPlainObject<T>();
  }
}

export type Config = ReplaceSubset<
  {
    clients: Client[];
    endpoints: Endpoint;
    features: Features;
  },
  Plain<ConfigDto>
>;
