import { Container } from 'inversify';

import { createProvider } from '../src/index';
import { init } from '../src/provider/inversify.config';
import { TYPES } from '../src/provider/types';

import { configPlainMock } from './provider/config/config.service.mock';
import { providerServiceMock } from './provider/provider.service.mock';

jest.mock('../src/provider/inversify.config');

describe('OpenIdConnect', () => {
  const containerMock = {
    get: jest.fn(),
  };

  beforeAll(() => {
    jest.resetAllMocks();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createProvider', () => {
    beforeAll(() => {
      jest
        .mocked(init)
        .mockResolvedValue(containerMock as unknown as Container);
      jest.mocked(containerMock.get).mockResolvedValue(providerServiceMock);
    });

    it('should get the provider service from the container', async () => {
      // When
      await createProvider(configPlainMock);

      // Then
      expect(containerMock.get).toHaveBeenCalledTimes(1);
      expect(containerMock.get).toHaveBeenCalledWith(TYPES.ProviderService);
    });

    it('should return the provider service', async () => {
      // When
      const result = await createProvider(configPlainMock);

      // Then
      expect(result).toStrictEqual(providerServiceMock);
    });
  });
});
