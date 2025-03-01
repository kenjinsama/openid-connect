import {
  defaultMessage,
  validate,
} from '../../../../../../src/provider/authorize/validators/authorize-parameters/is-not-forbidden-response-type.validator';

describe('IsNotForbiddenResponseType', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  describe('validate', () => {
    const authorizeParametersMock = {
      response_type: ['code'],
    };

    it('should return false if the value is not an array', () => {
      // Given
      const authorizeParametersMock = {
        response_type: 'code',
      };

      // When
      const result = validate(authorizeParametersMock.response_type);

      // Then
      expect(result).toBe(false);
    });

    it('should return true if the value is not forbidden', () => {
      // When
      const result = validate(authorizeParametersMock.response_type);

      // Then
      expect(result).toBe(true);
    });

    it('should return false if the value is forbidden ("token" without "id_token")', () => {
      // Given
      const authorizeParametersMock = {
        response_type: ['token'],
      };

      // When
      const result = validate(authorizeParametersMock.response_type);

      // Then
      expect(result).toBe(false);
    });
  });

  describe('defaultMessage', () => {
    it('should return the default message', () => {
      // Given
      const defaultMessageMock =
        'Can\'t use "token" response type without "id_token" response type. See https://openid.net/specs/openid-connect-core-1_0.html#rfc.section.3.2.2.1';

      // When
      const result = defaultMessage();

      // Then
      expect(result).toBe(defaultMessageMock);
    });
  });
});
