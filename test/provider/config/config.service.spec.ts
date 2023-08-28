import * as ClassTransformer from 'class-transformer';

import { ConfigService } from '../../../src/provider/config/config.service';
import { ConfigDto } from '../../../src/provider/config/dtos/config.dto';
import {
  configDtoMock,
  configMock,
  validationErrorMock,
} from './config.service.mock';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(() => {
    jest.restoreAllMocks();

    jest.spyOn(ClassTransformer, 'plainToClass').mockReturnValue(configDtoMock);

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
      {
        excludeExtraneousValues: true,
      },
    );
  });

  describe('setup', () => {
    beforeEach(() => {
      jest.spyOn(configDtoMock, 'validate').mockResolvedValue([]);
    });

    it('should validate the config', async () => {
      // When
      await service.setup();

      // Then
      expect(configDtoMock.validate).toHaveBeenCalledTimes(1);
      expect(configDtoMock.validate).toHaveBeenCalledWith();
    });

    it('should throw the validation errors if the validation fails', async () => {
      // Given
      jest
        .spyOn(configDtoMock, 'validate')
        .mockResolvedValueOnce(validationErrorMock);

      // When
      const result = service.setup();

      // Then
      await expect(result).rejects.toEqual(validationErrorMock);
    });
  });

  describe('get', () => {
    beforeEach(() => {
      configDtoMock.toPlainObject.mockReturnValue(configDtoMock);
    });

    it('should return the entire config if there is no argument passed', () => {
      // When
      const result = service.get();

      // Then
      expect(result).toEqual(configDtoMock);
    });

    it('should return the config property for the given key', () => {
      // When
      const result = service.get('issuer');

      // Then
      expect(result).toEqual(configDtoMock.issuer);
    });
  });
});
