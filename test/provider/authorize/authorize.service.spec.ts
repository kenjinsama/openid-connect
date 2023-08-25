import * as ClassTransformer from 'class-transformer';

import { AuthorizeService } from '../../../src/provider/authorize/authorize.service';
import { AuthorizeParametersDto } from '../../../src/provider/authorize/dtos/authorize-parameters.dto';

import {
  authorizeParametersDto,
  authorizeParametersMock,
} from './authorize.service.mock';

describe('AuthorizeService', () => {
  let service: AuthorizeService;

  beforeEach(() => {
    jest.restoreAllMocks();

    service = new AuthorizeService();
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

    it('should validate the DTO', async () => {
      // When
      await service.validateRequest(authorizeParametersMock);

      // Then
      expect(authorizeParametersDto.validate).toHaveBeenCalledTimes(1);
      expect(authorizeParametersDto.validate).toHaveBeenCalledWith();
    });

    it('should return the parsed request', async () => {
      // When
      const result = await service.validateRequest(authorizeParametersMock);

      // Then
      expect(result).toStrictEqual(authorizeParametersMock);
    });
  });
});
