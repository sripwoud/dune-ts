import type { JestConfigWithTsJest } from 'ts-jest'
import common from './jest.common'

const jestIntegrationConfig: JestConfigWithTsJest = {
  ...common,
  clearMocks: true,
  displayName: 'integration',
  moduleDirectories: ['node_modules', '<rootDir>'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  preset: 'ts-jest',
  setupFilesAfterEnv: [
    'jest-chain',
    'jest-extended/all',
    '<rootDir>/test/setup.integration.ts',
  ],
  testRegex: 'test/integration/.*\\.test\\.ts$',
}

export default jestIntegrationConfig
