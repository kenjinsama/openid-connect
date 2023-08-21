import { ProviderService } from '../../src/provider/provider.service';

import { configServiceMock } from './config/config.service.mock';

jest.mock('../../src/provider/provider.service');

export const providerServiceMock = new ProviderService(
  configServiceMock,
) as jest.Mocked<ProviderService>;
