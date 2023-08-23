import { inject, injectable, postConstruct } from 'inversify';

import { AuthorizeService } from '../authorize/authorize.service';

import {
  AuthorizeParameters,
  AuthorizeParametersT,
} from '../authorize/dtos/authorize-parameters.dto';
import { ConfigService } from './config/config.service';
import { TYPES } from './types';

@injectable()
export class ProviderService {
  constructor(
    @inject(TYPES.ConfigService) private readonly config: ConfigService,
    @inject(TYPES.AuthorizeService)
    private readonly authorize: AuthorizeService,
  ) {}

  @postConstruct()
  async setup(): Promise<void> {
    const issuer = await this.config.get('issuer');

    console.debug('Initializing issuer:', issuer);
  }

  async authorizeRequest(
    request: AuthorizeParameters,
  ): Promise<AuthorizeParametersT> {
    return await this.authorize.validateRequest(request);
  }
}
