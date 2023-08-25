import { AuthorizeParametersDto } from '../../../../../src/provider/authorize/dtos/authorize-parameters.dto';
import {
  defaultMessage,
  validate,
} from '../../../../../src/provider/authorize/validators/authorize-parameters/is-existing-client.validator';
import { ValidationArgumentsGeneric } from '../../../../../src/utils/types/validation-arguments-generic.type';
import { configMock } from '../../../config/config.service.mock';

describe('IsExistingClient', () => {
  const [clientMock] = configMock.clients;
  const clientIdMock = clientMock.client_id;

  beforeEach(() => {
    jest.restoreAllMocks();

    jest.spyOn(Reflect, 'getMetadata').mockReturnValue(clientMock);
  });

  describe('validate', () => {
    const authorizeParametersMock = {
      client_id: clientIdMock,
    };

    const validationParameters = {
      object: authorizeParametersMock,
    } as ValidationArgumentsGeneric<AuthorizeParametersDto>;

    it('should return true if the value is an existing client_id', () => {
      // When
      const result = validate(
        authorizeParametersMock.client_id,
        validationParameters,
      );

      // Then
      expect(result).toBe(true);
    });

    it('should return false if there is no client', () => {
      jest.spyOn(Reflect, 'getMetadata').mockReturnValueOnce(undefined);

      // When
      const result = validate('hacker_man', validationParameters);

      // Then
      expect(result).toBe(false);
    });
  });

  describe('defaultMessage', () => {
    const authorizeParametersMock = {
      client_id: clientIdMock,
    };

    const validationParameters = {
      object: authorizeParametersMock,
      property: 'client_id',
    } as ValidationArgumentsGeneric<AuthorizeParametersDto>;

    it('should return the default message', () => {
      // When
      const result = defaultMessage(validationParameters);

      // Then
      expect(result).toBe(
        `"${authorizeParametersMock.client_id}" is an not an existing client`,
      );
    });
  });
});
