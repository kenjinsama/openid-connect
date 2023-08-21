import { ProviderService } from '../../src/provider/provider.service';
import {
  configPlainMock,
  configServiceMock,
} from './config/config.service.mock';

describe('ProviderService', () => {
  let service: ProviderService;

  beforeEach(() => {
    jest.resetAllMocks();

    service = new ProviderService(configServiceMock);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('setup', () => {
    beforeEach(() => {
      configServiceMock.get.mockReturnValue(configPlainMock.issuer);
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
