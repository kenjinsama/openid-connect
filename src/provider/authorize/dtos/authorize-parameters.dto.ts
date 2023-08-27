import { Expose, Transform } from 'class-transformer';
import {
  ArrayContains,
  IsIn,
  IsJWT,
  IsLocale,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Min,
  ValidateIf,
} from 'class-validator';

import { Dto } from '../../../utils/dto';
import { ParseInt } from '../../../utils/transformers/parse-int.transformer';
import { Split } from '../../../utils/transformers/split.transformer';
import { Plain } from '../../../utils/types/plain.type';
import { ReplaceSubset } from '../../../utils/types/replace-subset.type';
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
  @IsIn(RESPONSE_TYPE_ALLOWED_VALUES, { each: true })
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
  @ArrayContains(SCOPE_AT_LEAST_CONTAINS)
  @Transform(Split(VALUES_SEPARATOR), { toClassOnly: true })
  readonly scope: string[];

  @Expose()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly state?: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @ValidateIf(AuthorizeParametersDto.nonceIsMandatory)
  readonly nonce?: string;

  @Expose()
  @IsOptional()
  @IsIn(DISPLAY_ALLOWED_VALUES)
  @IsString()
  readonly display?: string;

  @Expose()
  @IsOptional()
  @IsIn(PROMPT_ALLOWED_VALUES)
  @IsString()
  readonly prompt?: string;

  @Expose()
  @IsOptional()
  @Min(0)
  @Transform(ParseInt(), { toClassOnly: true })
  readonly max_age?: number;

  @Expose()
  @IsOptional()
  @IsLocale({ each: true })
  @Transform(Split(VALUES_SEPARATOR), { toClassOnly: true })
  readonly ui_locales?: string[];

  @Expose()
  @IsOptional()
  @IsJWT()
  readonly id_token_hint?: string;

  @Expose()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly login_hint?: string;

  @Expose()
  @IsOptional()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  @Transform(Split(VALUES_SEPARATOR), { toClassOnly: true })
  readonly acr_values?: string[];

  // Declarative code only
  /* istanbul ignore next */
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

  private static nonceIsMandatory(
    object: AuthorizeParametersDto,
    value: unknown,
  ): boolean {
    return (
      value !== undefined ||
      object.response_type?.includes('token') ||
      object.response_type?.includes('id_token')
    );
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
