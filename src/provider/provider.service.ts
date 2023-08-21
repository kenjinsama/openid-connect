import { inject, injectable, postConstruct } from 'inversify';

import { ConfigService } from './config/config.service';
import { TYPES } from './types';

@injectable()
export class ProviderService {
  constructor(
    @inject(TYPES.ConfigService) private readonly config: ConfigService,
  ) {}

  @postConstruct()
  async setup(): Promise<void> {
    const issuer = await this.config.get('issuer');

    console.debug('Initializing issuer:', issuer);
  }
}
