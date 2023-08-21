/* istanbul ignore file */

// Declarative file
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

import { Dto } from '../../dto';
import { Plain } from '../../plain.type';

export class ClientDto extends Dto {
  @IsString()
  @IsNotEmpty()
  readonly client_id: string;

  @IsString()
  @IsNotEmpty()
  readonly client_secret: string;

  @IsUrl(undefined, { each: true })
  readonly redirect_uris: string[];

  @IsUrl(undefined, { each: true })
  readonly post_logout_redirect_uris: string[];
}

export type Client = Plain<ClientDto>;
