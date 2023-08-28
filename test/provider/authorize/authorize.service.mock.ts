import { AuthorizeService } from '../../../src/provider/authorize/authorize.service';
import {
  AuthorizeParameters,
  AuthorizeParametersDto,
  AuthorizeParametersValid,
} from '../../../src/provider/authorize/dtos/authorize-parameters.dto';
import { configServiceMock } from '../config/config.service.mock';

jest.mock('../../../src/provider/authorize/authorize.service');

const authorizeParametersMockBase = {
  response_type: 'code',
  client_id: 'client_id',
  redirect_uri: 'https://example.com',
  scope: '  openid   given_name  ',
};

export const authorizeParametersMock: AuthorizeParameters = {
  ...authorizeParametersMockBase,
};

export const authorizeParametersValidMock: AuthorizeParametersValid = {
  ...authorizeParametersMockBase,
  response_type: ['code'],
  scope: ['openid', 'given_name'],
};

export const authorizeParametersDto: AuthorizeParametersDto = {
  ...authorizeParametersValidMock,
  validate: jest.fn(),
  toPlainObject: jest.fn(),
};

export const authorizeServiceMock = new AuthorizeService(
  configServiceMock,
) as jest.Mocked<AuthorizeService>;
