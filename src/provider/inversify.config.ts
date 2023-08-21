/* istanbul ignore file */

// Declarative file
import { Container } from 'inversify';

import { Config } from './config/config.dto';
import { ConfigService } from './config/config.service';
import { ProviderService } from './provider.service';
import { TYPES } from './types';

export async function init(config: Config): Promise<Container> {
  const configService = new ConfigService(config);
  await configService.setup();

  const oidc = new Container();
  oidc.bind<ConfigService>(TYPES.ConfigService).toConstantValue(configService);
  oidc.bind<ProviderService>(TYPES.ProviderService).to(ProviderService);

  return oidc;
}
