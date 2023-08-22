import { ConfigService } from '../../../src/provider/config/config.service';
import { Config } from '../../../src/provider/config/dtos/config.dto';

jest.mock('../../../src/provider/config/config.service');

export const configMock: Config = {
  issuer: 'https://issuer',
  clients: [
    {
      client_id: 'client_id',
      client_secret: 'client_secret',
      redirect_uris: ['https://example.com'],
      post_logout_redirect_uris: ['https://example.com'],
    },
  ],
  endpoints: {
    authorize: '/authorize',
    token: '/token',
    userinfo: '/userinfo',
  },
  features: {
    userinfo: true,
  },
};

export const configDtoMock = {
  ...configMock,
  validate: jest.fn(),
  toPlainObject: jest.fn(),
};

export const configServiceMock = new ConfigService(
  configMock,
) as jest.Mocked<ConfigService>;
