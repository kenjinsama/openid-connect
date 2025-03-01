import { AuthorizeParametersDto } from '../../../../../../src/provider/authorize/dtos/authorize-parameters.dto';
import {
  defaultMessage,
  validate,
} from '../../../../../../src/provider/authorize/validators/authorize-parameters/is-client-authorized-redirect-uri.validator';
import { ValidationArgumentsGeneric } from '../../../../../../src/utils/types/validation-arguments-generic.type';
import { configMock } from '../../../config/config.service.mock';

describe('IsClientAuthorizedRedirectUri', () => {
  const [clientMock] = configMock.clients;
  const redirectUriMock = clientMock.redirect_uris[0];

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();

    jest.spyOn(Reflect, 'getMetadata').mockReturnValue(clientMock);
  });

  describe('validate', () => {
    const authorizeParametersMock = {
      redirect_uri: redirectUriMock,
    };

    const validationParameters = {
      object: authorizeParametersMock,
    } as ValidationArgumentsGeneric<AuthorizeParametersDto>;

    it('should return true if the value is a valid redirect_uri', () => {
      // When
      const result = validate(
        authorizeParametersMock.redirect_uri,
        validationParameters,
      );

      // Then
      expect(result).toBe(true);
    });

    it('should return false if the value is not a valid redirect_uri', () => {
      // When
      const result = validate('https://invalid.com', validationParameters);

      // Then
      expect(result).toBe(false);
    });

    it('should return false if there is no client', () => {
      jest.spyOn(Reflect, 'getMetadata').mockReturnValueOnce(undefined);

      // When
      const result = validate(
        authorizeParametersMock.redirect_uri,
        validationParameters,
      );

      // Then
      expect(result).toBe(false);
    });
  });

  describe('defaultMessage', () => {
    const authorizeParametersMock = {
      redirect_uri: redirectUriMock,
    };

    const validationParameters = {
      object: authorizeParametersMock,
      property: 'redirect_uri',
    } as ValidationArgumentsGeneric<AuthorizeParametersDto>;

    it('should return the default message', () => {
      // When
      const result = defaultMessage(validationParameters);

      // Then
      expect(result).toBe(
        `"${authorizeParametersMock.redirect_uri}" is an not a valid redirect_uri for client "${clientMock.client_id}"`,
      );
    });

    it('should return the default message with "invalid_client" if there is no client', () => {
      // Given
      jest.spyOn(Reflect, 'getMetadata').mockReturnValueOnce(undefined);

      // When
      const result = defaultMessage(validationParameters);

      // Then
      expect(result).toBe(
        `"${authorizeParametersMock.redirect_uri}" is an not a valid redirect_uri for client "invalid_client"`,
      );
    });
  });
});
