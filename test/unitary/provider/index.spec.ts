import { Container } from 'inversify';

import { createProvider } from '../../../src/provider/index';
import { init } from '../../../src/provider/inversify.config';
import { TYPES } from '../../../src/provider/types';

import { configMock } from './config/config.service.mock';
import { providerServiceMock } from './provider.service.mock';

jest.mock('../../../src/provider/inversify.config');

describe('OpenIdConnect', () => {
  const containerMock = {
    getAsync: jest.fn(),
  };

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
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
      await createProvider(configMock);

      // Then
      expect(containerMock.getAsync).toHaveBeenCalledTimes(1);
      expect(containerMock.getAsync).toHaveBeenCalledWith(
        TYPES.ProviderService,
      );
    });

    it('should return the provider service', async () => {
      // When
      const result = await createProvider(configMock);

      // Then
      expect(result).toStrictEqual(providerServiceMock);
    });
  });
});
