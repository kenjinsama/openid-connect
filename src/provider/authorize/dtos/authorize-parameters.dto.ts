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
import {
  RESPONSE_TYPE_ALLOWED_VALUES,
  SCOPE_AT_LEAST_CONTAINS,
  VALUES_SEPARATOR,
} from '../constants';

export class AuthorizeParametersDto extends Dto {
  @Expose()
  @Transform(Split(VALUES_SEPARATOR), { toPlainOnly: true })
  @ContainsOnlyValuesIn(RESPONSE_TYPE_ALLOWED_VALUES, {
    separator: VALUES_SEPARATOR,
  })
  readonly response_type: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly client_id: string;

  @Expose()
  @IsUrl()
  readonly redirect_uri: string;

  @Expose()
  @Transform(Split(VALUES_SEPARATOR), { toPlainOnly: true })
  @ContainsAtLeastValues(SCOPE_AT_LEAST_CONTAINS, {
    separator: VALUES_SEPARATOR,
  })
  readonly scope: string;

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

  toPlainObject<T = AuthorizeParametersT>(): T {
    return super.toPlainObject<T>();
  }
}

export type AuthorizeParameters = Plain<AuthorizeParametersDto>;
export type AuthorizeParametersT = ReplaceSubset<
  {
    readonly response_type: string[];
    readonly scope: string[];
  },
  AuthorizeParameters
>;
