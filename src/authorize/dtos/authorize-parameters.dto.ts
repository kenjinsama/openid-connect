/* istanbul ignore file */

// Declarative file
import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

import { Dto } from '../../utils/dto';
import { Split } from '../../utils/transformers/split.transformer';
import { Plain } from '../../utils/types/plain.type';
import { ReplaceSubset } from '../../utils/types/replace-subset.type';

export class AuthorizeParametersDto extends Dto {
  @Expose()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  @Transform(Split(/[ ]+/), { toPlainOnly: true })
  readonly response_type: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly client_id: string;

  @Expose()
  @IsUrl()
  readonly redirect_uri: string;

  @Expose()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  @Transform(Split(/[ ]+/), { toPlainOnly: true })
  @IsString()
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
