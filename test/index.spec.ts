import { Container } from 'inversify';

import { createProvider } from '../src/index';
import { init } from '../src/provider/inversify.config';
import { TYPES } from '../src/provider/types';

import { configPlainMock } from './provider/config/config.service.mock';
import { providerServiceMock } from './provider/provider.service.mock';

jest.mock('../src/provider/inversify.config');

describe('OpenIdConnect', () => {
  const containerMock = {
    getAsync: jest.fn(),
  };

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('createProvider', () => {
    beforeEach(() => {
      jest
        .mocked(init)
        .mockResolvedValue(containerMock as unknown as Container);
      jest
        .mocked(containerMock.getAsync)
        .mockResolvedValue(providerServiceMock);
    });

    it('should get the provider service from the container', async () => {
      // When
      await createProvider(configPlainMock);

      // Then
      expect(containerMock.getAsync).toHaveBeenCalledTimes(1);
      expect(containerMock.getAsync).toHaveBeenCalledWith(
        TYPES.ProviderService,
      );
    });

    it('should return the provider service', async () => {
      // When
      const result = await createProvider(configPlainMock);

      // Then
      expect(result).toStrictEqual(providerServiceMock);
    });
  });
});
