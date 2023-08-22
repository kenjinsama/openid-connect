import { plainToClass } from 'class-transformer';
import { injectable } from 'inversify';

import {
  AuthorizeParameters,
  AuthorizeParametersDto,
} from './dtos/authorize-parameters.dto';

@injectable()
export class AuthorizeService {
  constructor() {
    console.debug('Initializing AuthorizeService...');
  }

  async validateRequest(request: AuthorizeParameters): Promise<void> {
    console.debug('Validating request:', request);

    const requestDto = plainToClass(AuthorizeParametersDto, request, {
      excludeExtraneousValues: true,
    });

    await requestDto.validate();

    console.debug('Request is valid:', requestDto.toPlainObject());
  }
}
