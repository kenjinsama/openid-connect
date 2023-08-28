import { plainToClass } from 'class-transformer';
import { ValidationError } from 'class-validator';
import { inject, injectable } from 'inversify';

import { ConfigService } from '../config/config.service';
import { TYPES } from '../types';
import {
  AuthorizeParameters,
  AuthorizeParametersDto,
  AuthorizeParametersValid,
} from './dtos/authorize-parameters.dto';

@injectable()
export class AuthorizeService {
  constructor(
    @inject(TYPES.ConfigService) private readonly configService: ConfigService,
  ) {
    console.debug('Initializing AuthorizeService...');
  }

  async validateRequest(
    request: AuthorizeParameters,
  ): Promise<AuthorizeParametersValid | ValidationError[]> {
    console.debug('Validating request:', request);

    const requestDto = plainToClass(AuthorizeParametersDto, request);

    const config = await this.configService.get();

    const validationErrors = await requestDto.validate(config);

    if (validationErrors.length > 0) {
      return validationErrors;
    }

    console.debug('Request is valid:', requestDto.toPlainObject());

    return requestDto.toPlainObject();
  }
}
