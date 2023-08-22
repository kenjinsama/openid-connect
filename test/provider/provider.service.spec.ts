import { ProviderService } from '../../src/provider/provider.service';
import { configMock, configServiceMock } from './config/config.service.mock';

describe('ProviderService', () => {
  let service: ProviderService;

  beforeEach(() => {
    jest.restoreAllMocks();

    service = new ProviderService(configServiceMock);
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
});
