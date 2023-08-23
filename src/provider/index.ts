import 'reflect-metadata';

import { Config as ProviderConfig } from './config/dtos/config.dto';
import { init } from './inversify.config';
import { ProviderService } from './provider.service';
import { TYPES } from './types';

export async function createProvider(
  config: ProviderConfig,
): Promise<ProviderService> {
  const container = await init(config);

  return container.getAsync<ProviderService>(TYPES.ProviderService);
}
