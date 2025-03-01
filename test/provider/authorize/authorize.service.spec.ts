import * as ClassTransformer from 'class-transformer';

import { AuthorizeService } from '../../../src/provider/authorize/authorize.service';
import { AuthorizeParametersDto } from '../../../src/provider/authorize/dtos/authorize-parameters.dto';

import {
  configMock,
  configServiceMock,
  validationErrorMock,
} from '../config/config.service.mock';
import {
  authorizeParametersDto,
  authorizeParametersMock,
} from './authorize.service.mock';

describe('AuthorizeService', () => {
  let service: AuthorizeService;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();

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

      jest.mocked(authorizeParametersDto.validate).mockResolvedValue([]);

      // Wont work without any since it does not recognize the two signatures and pick the wrong one
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jest.mocked<any>(configServiceMock.get).mockResolvedValue(configMock);
    });

    it('should instantiate the DTO', async () => {
      // When
      await service.validateRequest(authorizeParametersMock);

      // Then
      expect(ClassTransformer.plainToClass).toHaveBeenCalledTimes(1);
      expect(ClassTransformer.plainToClass).toHaveBeenCalledWith(
        AuthorizeParametersDto,
        authorizeParametersMock,
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

    it('should return the validation errors if the validation fails', async () => {
      // Given
      jest
        .mocked(authorizeParametersDto.validate)
        .mockResolvedValueOnce(validationErrorMock);

      // When
      const result = await service.validateRequest(authorizeParametersMock);

      // Then
      expect(result).toStrictEqual(validationErrorMock);
    });

    it('should return the parsed request', async () => {
      // When
      const result = await service.validateRequest(authorizeParametersMock);

      // Then
      expect(result).toStrictEqual(authorizeParametersMock);
    });
  });
});
