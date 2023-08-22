import { ConfigService } from '../../../src/provider/config/config.service';
import { Config } from '../../../src/provider/config/dtos/config.dto';

jest.mock('../../../src/provider/config/config.service');

export const configPlainMock: Config = {
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

export const configServiceMock = new ConfigService(
  configPlainMock,
) as jest.Mocked<ConfigService>;
