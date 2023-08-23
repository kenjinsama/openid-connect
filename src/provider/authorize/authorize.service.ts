import { plainToClass } from 'class-transformer';
import { injectable } from 'inversify';

import {
  AuthorizeParameters,
  AuthorizeParametersDto,
  AuthorizeParametersT,
} from './dtos/authorize-parameters.dto';

@injectable()
export class AuthorizeService {
  constructor() {
    console.debug('Initializing AuthorizeService...');
  }

  async validateRequest(
    request: AuthorizeParameters,
  ): Promise<AuthorizeParametersT> | never {
    console.debug('Validating request:', request);

    const requestDto = plainToClass(AuthorizeParametersDto, request, {
      excludeExtraneousValues: true,
    });

    await requestDto.validate();

    console.debug('Request is valid:', requestDto.toPlainObject());

    return requestDto.toPlainObject();
  }
}