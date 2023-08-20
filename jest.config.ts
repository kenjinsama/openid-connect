// This does not need publication as it is for testing only
// eslint-disable-next-line node/no-unpublished-import
import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['*.spec.ts', '**/*.spec.ts'],
  collectCoverageFrom: ['src/*.ts', 'src/**/*.ts'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  setupFiles: ['./jest-setup-file.ts'],
};

export default jestConfig;
