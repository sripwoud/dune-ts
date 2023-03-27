import type { JestConfigWithTsJest } from 'ts-jest'
import common from './jest.common'

const jestLintConfig: JestConfigWithTsJest = {
  ...common,
  displayName: 'lint',
  runner: 'jest-runner-eslint',
  testMatch: ['<rootDir>/**/*.(cjs|mjs|js|jsx|ts|tsx)'],
  testPathIgnorePatterns: ['<rootDir>/test/coverage', '<rootDir>/dist'],
}

export default jestLintConfig
