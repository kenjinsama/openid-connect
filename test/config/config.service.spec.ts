import * as ClassTransformer from 'class-transformer';

import { ConfigDto } from '../../src/config/config.dto';
import { ConfigService } from '../../src/config/config.service';

describe('ConfigService', () => {
  let service: ConfigService;

  const configPlainMock = {
    issuer: 'https://issuer',
    clients: [],
  };
  const configMock = {
    ...configPlainMock,
    validate: jest.fn(),
    toPlainObject: jest.fn(),
  };

  beforeEach(() => {
    jest.resetAllMocks();

    jest.spyOn(ClassTransformer, 'plainToClass').mockReturnValue(configMock);

    service = new ConfigService(configMock);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should transform the config into its DTO form', () => {
    // Then
    expect(ClassTransformer.plainToClass).toHaveBeenCalledTimes(1);
    expect(ClassTransformer.plainToClass).toHaveBeenCalledWith(
      ConfigDto,
      configMock,
    );
  });

  describe('setup', () => {
    it('should validate the config', async () => {
      // When
      await service.setup();

      // Then
      expect(configMock.validate).toHaveBeenCalledTimes(1);
      expect(configMock.validate).toHaveBeenCalledWith();
    });
  });

  describe('get', () => {
    beforeEach(() => {
      configMock.toPlainObject.mockReturnValue(configPlainMock);
    });

    it('should return the entire config if there is no argument passed', () => {
      // When
      const result = service.get();

      // Then
      expect(result).toEqual(configPlainMock);
    });

    it('should return the config property for the given key', () => {
      // When
      const result = service.get('issuer');

      // Then
      expect(result).toEqual(configPlainMock.issuer);
    });
  });
});
