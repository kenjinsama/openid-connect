import { ValidationError } from 'class-validator';
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
    {
      client_id: 'client_id_2',
      client_secret: 'client_secret_2',
      redirect_uris: ['https://example-2.com'],
      post_logout_redirect_uris: ['https://example-2.com'],
      scopes: ['openid'],
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

export const validationErrorMock: ValidationError[] = [
  {
    target: {
      property: 'property',
      property_2: 'property_2',
    },
    property: 'property',
    value: 'value',
    children: [],
    constraints: {
      constraint: 'constraint_message',
    },
  },
  {
    target: {
      property: 'property',
      property_2: 'property_2',
    },
    property: 'property_2',
    value: 'value',
    children: [],
    constraints: {
      constraint_2: 'constraint_message_2',
      constraint_3: 'constraint_message_3',
    },
  },
];

export const configDtoMock = {
  ...configMock,
  validate: jest.fn(),
  toPlainObject: jest.fn(),
};

export const configServiceMock = new ConfigService(
  configMock,
) as jest.Mocked<ConfigService>;
