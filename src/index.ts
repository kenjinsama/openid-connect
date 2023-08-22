import 'reflect-metadata';

import { Config as ProviderConfig } from './provider/config/dtos/config.dto';
import { init } from './provider/inversify.config';
import { ProviderService } from './provider/provider.service';
import { TYPES } from './provider/types';

export async function createProvider(
  config: ProviderConfig,
): Promise<ProviderService> {
  const container = await init(config);

  return container.getAsync<ProviderService>(TYPES.ProviderService);
}
