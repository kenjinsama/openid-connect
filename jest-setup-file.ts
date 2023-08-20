import 'reflect-metadata';

global.console = {
  debug: jest.fn(),
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
} as unknown as Console;
