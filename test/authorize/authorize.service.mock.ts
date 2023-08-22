import { AuthorizeService } from '../../src/authorize/authorize.service';
import {
  AuthorizeParameters,
  AuthorizeParametersDto,
  AuthorizeParametersT,
} from '../../src/authorize/dtos/authorize-parameters.dto';

jest.mock('../../src/authorize/authorize.service');

export const authorizeParametersMock: AuthorizeParameters = {
  response_type: 'code',
  client_id: 'client_id',
  redirect_uri: 'https://example.com',
  scope: '  openid   given_name  ',
};

export const authorizeParametersDto: AuthorizeParametersDto = {
  ...authorizeParametersMock,
  validate: jest.fn(),
  toPlainObject: jest.fn(),
};

export const authorizeParametersTMock: AuthorizeParametersT = {
  ...authorizeParametersMock,
  response_type: ['code'],
  scope: ['openid', 'given_name'],
};

export const authorizeServiceMock =
  new AuthorizeService() as jest.Mocked<AuthorizeService>;
