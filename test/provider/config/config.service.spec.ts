import * as ClassTransformer from 'class-transformer';

import { ConfigService } from '../../../src/provider/config/config.service';
import { ConfigDto } from '../../../src/provider/config/dtos/config.dto';
import { configPlainMock } from './config.service.mock';

describe('ConfigService', () => {
  let service: ConfigService;

  const configMock = {
    ...configPlainMock,
    validate: jest.fn(),
    toPlainObject: jest.fn(),
  };

  beforeEach(() => {
    jest.restoreAllMocks();

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
