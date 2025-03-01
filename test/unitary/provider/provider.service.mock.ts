import { ProviderService } from '../../../src/provider/provider.service';

import { authorizeServiceMock } from './authorize/authorize.service.mock';
import { configServiceMock } from './config/config.service.mock';

jest.mock('../../../src/provider/provider.service');

export const providerServiceMock = new ProviderService(
  configServiceMock,
  authorizeServiceMock,
) as jest.Mocked<ProviderService>;
