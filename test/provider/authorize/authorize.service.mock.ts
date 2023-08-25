import { AuthorizeService } from '../../../src/provider/authorize/authorize.service';
import {
  AuthorizeParameters,
  AuthorizeParametersDto,
} from '../../../src/provider/authorize/dtos/authorize-parameters.dto';
import { Plain } from '../../../src/utils/types/plain.type';

jest.mock('../../../src/provider/authorize/authorize.service');

export const authorizeParametersPlainMock: Plain<AuthorizeParametersDto> = {
  response_type: 'code',
  client_id: 'client_id',
  redirect_uri: 'https://example.com',
  scope: '  openid   given_name  ',
};

export const authorizeParametersDto: AuthorizeParametersDto = {
  ...authorizeParametersPlainMock,
  validate: jest.fn(),
  toPlainObject: jest.fn(),
};

export const authorizeParametersMock: AuthorizeParameters = {
  ...authorizeParametersPlainMock,
  response_type: ['code'],
  scope: ['openid', 'given_name'],
};

export const authorizeServiceMock =
  new AuthorizeService() as jest.Mocked<AuthorizeService>;
