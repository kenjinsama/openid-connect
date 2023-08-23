/* istanbul ignore file */

// Declarative file
import { Container } from 'inversify';

import { AuthorizeService } from './authorize/authorize.service';
import { ConfigService } from './config/config.service';
import { Config } from './config/dtos/config.dto';
import { ProviderService } from './provider.service';
import { TYPES } from './types';

export async function init(config: Config): Promise<Container> {
  const configService = new ConfigService(config);
  await configService.setup();

  const oidc = new Container();
  oidc.bind<ProviderService>(TYPES.ProviderService).to(ProviderService);
  oidc.bind<ConfigService>(TYPES.ConfigService).toConstantValue(configService);
  oidc.bind<AuthorizeService>(TYPES.AuthorizeService).to(AuthorizeService);

  return oidc;
}
