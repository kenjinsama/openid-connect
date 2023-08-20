import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

import { ClientDto } from '../clients/service-provider.dto';
import { Dto } from '../dto';
import { Plain } from '../plain.type';

export class ConfigDto extends Dto {
  @IsString()
  @IsNotEmpty()
  readonly issuer: string;

  @ValidateNested()
  @Type(() => ClientDto)
  readonly clients: ClientDto[];
}

export type Config = Plain<ConfigDto>;
