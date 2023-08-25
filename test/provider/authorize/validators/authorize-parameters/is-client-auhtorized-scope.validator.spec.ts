import { AuthorizeParametersDto } from '../../../../../src/provider/authorize/dtos/authorize-parameters.dto';
import {
  defaultMessage,
  validate,
} from '../../../../../src/provider/authorize/validators/authorize-parameters/is-client-authorized-scope.validator';
import { ValidationArgumentsGeneric } from '../../../../../src/utils/types/validation-arguments-generic.type';
import { configMock } from '../../../config/config.service.mock';

describe('IsClientAuthorizedScope', () => {
  const [, clientMock] = configMock.clients;
  const scopeMock = clientMock.scopes;

  beforeEach(() => {
    jest.restoreAllMocks();

    jest.spyOn(Reflect, 'getMetadata').mockReturnValue(clientMock);
  });

  describe('validate', () => {
    const authorizeParametersMock = {
      scope: scopeMock,
    };

    const validationParameters = {
      object: authorizeParametersMock,
    } as ValidationArgumentsGeneric<AuthorizeParametersDto>;

    it('should return true if the value is a valid scope', () => {
      // When
      const result = validate(
        authorizeParametersMock.scope,
        validationParameters,
      );

      // Then
      expect(result).toBe(true);
    });

    it('should return false if the value is not a valid scope', () => {
      // When
      const result = validate(['unauthorized_scope'], validationParameters);

      // Then
      expect(result).toBe(false);
    });

    it('should return false if the value is not an array', () => {
      // When
      const result = validate('what ?', validationParameters);

      // Then
      expect(result).toBe(false);
    });

    it('should return false if there is no client', () => {
      jest.spyOn(Reflect, 'getMetadata').mockReturnValueOnce(undefined);

      // When
      const result = validate(
        authorizeParametersMock.scope,
        validationParameters,
      );

      // Then
      expect(result).toBe(false);
    });

    it('should return true if there is no client.scopes', () => {
      const [clientNoScopeMock] = configMock.clients;
      jest.spyOn(Reflect, 'getMetadata').mockReturnValueOnce(clientNoScopeMock);

      // When
      const result = validate(
        authorizeParametersMock.scope,
        validationParameters,
      );

      // Then
      expect(result).toBe(true);
    });
  });

  describe('defaultMessage', () => {
    const authorizeParametersMock = {
      scope: scopeMock,
    };

    const validationParameters = {
      object: authorizeParametersMock,
      property: 'scope',
    } as ValidationArgumentsGeneric<AuthorizeParametersDto>;

    it('should return the default message', () => {
      // When
      const result = defaultMessage(validationParameters);

      // Then
      expect(result).toBe(
        `"${authorizeParametersMock.scope}" is an not a valid scope for client "${clientMock.client_id}"`,
      );
    });

    it('should return the default message with "invalid_client" if there is no client', () => {
      // Given
      jest.spyOn(Reflect, 'getMetadata').mockReturnValueOnce(undefined);

      // When
      const result = defaultMessage(validationParameters);

      // Then
      expect(result).toBe(
        `"${authorizeParametersMock.scope}" is an not a valid scope for client "invalid_client"`,
      );
    });
  });
});
