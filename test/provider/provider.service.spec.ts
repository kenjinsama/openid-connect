import { ProviderService } from '../../src/provider/provider.service';
import {
  authorizeParametersMock,
  authorizeServiceMock,
} from '../authorize/authorize.service.mock';
import { configMock, configServiceMock } from './config/config.service.mock';

describe('ProviderService', () => {
  let service: ProviderService;

  beforeEach(() => {
    jest.restoreAllMocks();

    service = new ProviderService(configServiceMock, authorizeServiceMock);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('setup', () => {
    beforeEach(() => {
      configServiceMock.get.mockReturnValue(configMock.issuer);
    });

    it('should find the issuer', async () => {
      // When
      await service.setup();

      // Then
      expect(configServiceMock.get).toHaveBeenCalledTimes(1);
      expect(configServiceMock.get).toHaveBeenCalledWith('issuer');
    });
  });

  describe('authorizeRequest', () => {
    it('should validate the request', async () => {
      // When
      await service.authorizeRequest(authorizeParametersMock);

      // Then
      expect(authorizeServiceMock.validateRequest).toHaveBeenCalledTimes(1);
      expect(authorizeServiceMock.validateRequest).toHaveBeenCalledWith(
        authorizeParametersMock,
      );
    });
  });
});
