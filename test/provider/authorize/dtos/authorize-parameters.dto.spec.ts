import { plainToClass } from 'class-transformer';

import { AuthorizeParametersDto } from '../../../../src/provider/authorize/dtos/authorize-parameters.dto';
import { Dto } from '../../../../src/utils/dto';
import { configMock } from '../../config/config.service.mock';
import { authorizeParametersMock } from '../authorize.service.mock';

jest.mock('../../../../src/utils/dto');

describe('AuthorizeParametersDto', () => {
  let dto: AuthorizeParametersDto;

  beforeEach(() => {
    jest.restoreAllMocks();

    dto = plainToClass(AuthorizeParametersDto, authorizeParametersMock, {
      excludeExtraneousValues: true,
    });
  });

  describe('validate', () => {
    beforeEach(() => {
      jest.mocked(Dto.prototype.validate).mockResolvedValue([]);
      jest.spyOn(Reflect, 'defineMetadata');
    });

    it('should define the client metadata matched by client_id from the given config if found', async () => {
      // When
      await dto.validate(configMock);

      // Then
      expect(Reflect.defineMetadata).toHaveBeenCalledTimes(1);
      expect(Reflect.defineMetadata).toHaveBeenCalledWith(
        '__client',
        configMock.clients[0],
        dto,
      );
    });

    it('should define the client metadata matched by client_id as undefined if not found', async () => {
      // Given
      const config = { ...configMock, clients: [] };

      // When
      await dto.validate(config);

      // Then
      expect(Reflect.defineMetadata).toHaveBeenCalledTimes(1);
      expect(Reflect.defineMetadata).toHaveBeenCalledWith(
        '__client',
        undefined,
        dto,
      );
    });

    it('should call the validate method from the parent class and ask to not removes unknown parameters', async () => {
      // Given
      const expectedOptions = {
        forbidNonWhitelisted: false,
        forbidUnknownValues: false,
        whitelist: false,
      };

      // When
      await dto.validate(configMock);

      // Then
      expect(Dto.prototype.validate).toHaveBeenCalledTimes(1);
      expect(Dto.prototype.validate).toHaveBeenCalledWith(expectedOptions);
    });
  });

  describe('nonceIsMandatory', () => {
    it('should return true if the value is defined', () => {
      // Given
      const value = 'value';

      // When
      const result = AuthorizeParametersDto['nonceIsMandatory'](
        dto,
        value as unknown,
      );

      // Then
      expect(result).toBe(true);
    });

    it('should return true if the value is undefined and response_type includes token', () => {
      // Given
      const value = undefined;
      const dto = plainToClass(
        AuthorizeParametersDto,
        { ...authorizeParametersMock, response_type: 'token' },
        {
          excludeExtraneousValues: true,
        },
      );

      // When
      const result = AuthorizeParametersDto['nonceIsMandatory'](
        dto,
        value as unknown,
      );

      // Then
      expect(result).toBe(true);
    });

    it('should return true if the value is undefined and response_type includes id_token', () => {
      // Given
      const value = undefined;
      const dto = plainToClass(
        AuthorizeParametersDto,
        { ...authorizeParametersMock, response_type: 'id_token' },
        {
          excludeExtraneousValues: true,
        },
      );

      // When
      const result = AuthorizeParametersDto['nonceIsMandatory'](
        dto,
        value as unknown,
      );

      // Then
      expect(result).toBe(true);
    });

    it('should return false if the value is undefined and response_type does not include token or id_token', () => {
      // Given
      const value = undefined;

      // When
      const result = AuthorizeParametersDto['nonceIsMandatory'](
        dto,
        value as unknown,
      );

      // Then
      expect(result).toBe(false);
    });
  });
});
