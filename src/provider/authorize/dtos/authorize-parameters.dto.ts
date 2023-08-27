/* istanbul ignore file */

// Declarative file
import { Expose, Transform } from 'class-transformer';
import {
  IsIn,
  IsJWT,
  IsLocale,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';

import { Dto } from '../../../utils/dto';
import { ParseInt } from '../../../utils/transformers/parse-int.transformer';
import { Split } from '../../../utils/transformers/split.transformer';
import { Plain } from '../../../utils/types/plain.type';
import { ReplaceSubset } from '../../../utils/types/replace-subset.type';
import { ContainsAtLeastValues } from '../../../utils/validators/contains-at-least-values.validator';
import { ContainsOnlyValuesIn } from '../../../utils/validators/contains-only-values-in.validator';
import { Config } from '../../config/dtos/config.dto';
import {
  DISPLAY_ALLOWED_VALUES,
  PROMPT_ALLOWED_VALUES,
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
  @IsClientAuthorizedScope()
  @ContainsAtLeastValues(SCOPE_AT_LEAST_CONTAINS)
  @Transform(Split(VALUES_SEPARATOR), { toClassOnly: true })
  readonly scope: string[];

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly state?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly nonce?: string;

  @IsOptional()
  @IsIn(DISPLAY_ALLOWED_VALUES)
  @IsString()
  readonly display?: string;

  @IsOptional()
  @IsIn(PROMPT_ALLOWED_VALUES)
  @IsString()
  readonly prompt?: string;

  @IsOptional()
  @Min(0)
  @Transform(ParseInt(), { toClassOnly: true })
  readonly max_age?: number;

  @IsOptional()
  @IsLocale({ each: true })
  @Transform(Split(VALUES_SEPARATOR), { toClassOnly: true })
  readonly ui_locales?: string[];

  @IsOptional()
  @IsJWT()
  readonly id_token_hint?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly login_hint?: string;

  @IsOptional()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  @Transform(Split(VALUES_SEPARATOR), { toClassOnly: true })
  readonly acr_values?: string[];

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
