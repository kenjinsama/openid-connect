import * as ClassTransformer from 'class-transformer';

import { AuthorizeService } from '../../../src/provider/authorize/authorize.service';
import { AuthorizeParametersDto } from '../../../src/provider/authorize/dtos/authorize-parameters.dto';

import { configMock, configServiceMock } from '../config/config.service.mock';
import {
  authorizeParametersDto,
  authorizeParametersMock,
} from './authorize.service.mock';

describe('AuthorizeService', () => {
  let service: AuthorizeService;

  beforeEach(() => {
    jest.restoreAllMocks();

    service = new AuthorizeService(configServiceMock);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateRequest', () => {
    beforeEach(() => {
      jest
        .spyOn(ClassTransformer, 'plainToClass')
        .mockReturnValue(authorizeParametersDto);

      jest
        .mocked(authorizeParametersDto.toPlainObject)
        .mockReturnValue(authorizeParametersMock);

      // Wont work without any since it does not recognize the two signatures and pick the wrong one
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jest.mocked<any>(configServiceMock.get).mockReturnValue(configMock);
    });

    it('should instantiate the DTO', async () => {
      // When
      await service.validateRequest(authorizeParametersMock);

      // Then
      expect(ClassTransformer.plainToClass).toHaveBeenCalledTimes(1);
      expect(ClassTransformer.plainToClass).toHaveBeenCalledWith(
        AuthorizeParametersDto,
        authorizeParametersMock,
        {
          excludeExtraneousValues: true,
        },
      );
    });

    it('should retrieve the config', async () => {
      // When
      await service.validateRequest(authorizeParametersMock);

      // Then
      expect(configServiceMock.get).toHaveBeenCalledTimes(1);
      expect(configServiceMock.get).toHaveBeenCalledWith();
    });

    it('should validate the DTO with the provider config', async () => {
      // When
      await service.validateRequest(authorizeParametersMock);

      // Then
      expect(authorizeParametersDto.validate).toHaveBeenCalledTimes(1);
      expect(authorizeParametersDto.validate).toHaveBeenCalledWith(configMock);
    });

    it('should return the parsed request', async () => {
      // When
      const result = await service.validateRequest(authorizeParametersMock);

      // Then
      expect(result).toStrictEqual(authorizeParametersMock);
    });
  });
});
