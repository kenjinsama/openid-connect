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
      jest.mocked(Dto.prototype.validate).mockResolvedValue(undefined);
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

    it('should call the validate method from the parent class', async () => {
      // When
      await dto.validate(configMock);

      // Then
      expect(Dto.prototype.validate).toHaveBeenCalledTimes(1);
      expect(Dto.prototype.validate).toHaveBeenCalledWith();
    });
  });
});
