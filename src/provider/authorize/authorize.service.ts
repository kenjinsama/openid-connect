import { plainToClass } from 'class-transformer';
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
  ): Promise<AuthorizeParametersValid> | never {
    console.debug('Validating request:', request);

    const requestDto = plainToClass(AuthorizeParametersDto, request, {
      excludeExtraneousValues: true,
    });

    const config = await this.configService.get();

    await requestDto.validate(config);

    console.debug('Request is valid:', requestDto.toPlainObject());

    return requestDto.toPlainObject();
  }
}
