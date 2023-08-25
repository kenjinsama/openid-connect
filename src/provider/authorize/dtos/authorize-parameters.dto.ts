/* istanbul ignore file */

// Declarative file
import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

import { Dto } from '../../../utils/dto';
import { Split } from '../../../utils/transformers/split.transformer';
import { Plain } from '../../../utils/types/plain.type';
import { ReplaceSubset } from '../../../utils/types/replace-subset.type';
import { ContainsAtLeastValues } from '../../../utils/validators/contains-at-least-values.validator';
import { ContainsOnlyValuesIn } from '../../../utils/validators/contains-only-values-in.validator';
import { Config } from '../../config/dtos/config.dto';
import {
  RESPONSE_TYPE_ALLOWED_VALUES,
  SCOPE_AT_LEAST_CONTAINS,
  VALUES_SEPARATOR,
} from '../constants';
import { IsClientAuthorizedRedirectUri } from '../validators/authorize-parameters/is-client-authorized-redirect-uri.validator';
import { IsClientAuthorizedScope } from '../validators/authorize-parameters/is-client-authorized-scope.validator';
import { IsExistingClient } from '../validators/authorize-parameters/is-existing-client.validator';

export class AuthorizeParametersDto extends Dto {
  @Expose()
  @ContainsOnlyValuesIn(RESPONSE_TYPE_ALLOWED_VALUES)
  @Transform(Split(VALUES_SEPARATOR), { toClassOnly: true })
  readonly response_type: string[];

  @Expose()
  @IsExistingClient()
  @IsNotEmpty()
  @IsString()
  readonly client_id: string;

  @Expose()
  @IsClientAuthorizedRedirectUri()
  @IsUrl()
  readonly redirect_uri: string;

  @Expose()
  @ContainsAtLeastValues(SCOPE_AT_LEAST_CONTAINS)
  @Transform(Split(VALUES_SEPARATOR), { toClassOnly: true })
  readonly scope: string[];

  // @IsOptional()
  // @IsString()
  // @IsNotEmpty()
  // readonly state?: string;

  // @IsOptional()
  // @IsString()
  // @IsNotEmpty()
  // readonly nonce?: string;

  // @IsOptional()
  // @IsString()
  // @IsNotEmpty()
  // readonly display?: string;

  // @IsOptional()
  // @IsString()
  // @IsNotEmpty()
  // readonly prompt?: string;

  // @IsOptional()
  // @IsString()
  // @IsNotEmpty()
  // readonly max_age?: string;

  // @IsOptional()
  // @IsString()
  // @IsNotEmpty()
  // readonly ui_locales?: string;

  // @IsOptional()
  // @IsString()
  // @IsNotEmpty()
  // readonly claims_locales?: string;

  // @IsOptional()
  // @IsString()
  // @IsNotEmpty()
  // readonly id_token_hint?: string;

  // @IsOptional()
  // @IsString()
  // @IsNotEmpty()
  // readonly login_hint?: string;

  // @IsOptional()
  // @IsString()
  // @IsNotEmpty()
  // readonly acr_values?: string;

  override toPlainObject<T = AuthorizeParametersValid>(): T {
    return super.toPlainObject<T>();
  }

  override async validate(config: Config): Promise<void> {
    const client = config.clients.find(
      client => client.client_id === this.client_id,
    );

    Reflect.defineMetadata('__client', client, this);

    return await super.validate();
  }
}

export type AuthorizeParameters = ReplaceSubset<
  {
    response_type: string;
    scope: string;
  },
  AuthorizeParametersValid
>;
export type AuthorizeParametersValid = Plain<AuthorizeParametersDto>;
