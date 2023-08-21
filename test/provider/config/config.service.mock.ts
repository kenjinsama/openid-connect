import { Config } from '../../../src/provider/config/config.dto';
import { ConfigService } from '../../../src/provider/config/config.service';

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
};

export const configServiceMock = new ConfigService(
  configPlainMock,
) as jest.Mocked<ConfigService>;
