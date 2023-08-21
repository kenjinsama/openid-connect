/* istanbul ignore file */

// Declarative file
import { Type } from 'class-transformer';
import { IsUrl, ValidateNested } from 'class-validator';

import { Dto } from '../../dto';
import { Plain } from '../../plain.type';
import { ClientDto } from '../clients/service-provider.dto';

export class ConfigDto extends Dto {
  @IsUrl()
  readonly issuer: string;

  @ValidateNested()
  @Type(() => ClientDto)
  readonly clients: ClientDto[];
}

export type Config = Plain<ConfigDto>;
