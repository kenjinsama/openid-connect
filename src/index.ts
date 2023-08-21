import 'reflect-metadata';

import { Config as ProviderConfig } from './provider/config/config.dto';
import { init } from './provider/inversify.config';
import { ProviderService } from './provider/provider.service';
import { TYPES } from './provider/types';

export class OpenIdConnect {
  static async createProvider(
    config: ProviderConfig,
  ): Promise<ProviderService> {
    const container = await init(config);

    const provider = await container.get<ProviderService>(
      TYPES.ProviderService,
    );
    return provider;
  }
}
// TODO: more examples
