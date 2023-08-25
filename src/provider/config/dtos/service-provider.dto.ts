/* istanbul ignore file */

// Declarative file
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

import { Dto } from '../../../utils/dto';
import { Plain } from '../../../utils/types/plain.type';

export class ClientDto extends Dto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly client_id: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly client_secret: string;

  @Expose()
  @IsUrl(undefined, { each: true })
  readonly redirect_uris: string[];

  @Expose()
  @IsUrl(undefined, { each: true })
  readonly post_logout_redirect_uris: string[];

  override toPlainObject<T = Client>(): T {
    return super.toPlainObject<T>();
  }
}

export type Client = Plain<ClientDto>;
