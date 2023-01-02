import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/Cookies.ts',
    '<rootDir>/src/Dune.ts',
    '<rootDir>/src/decorators/index.ts',
  ],
  coverageDirectory: 'coverage',
  projects: [
    './test/jest.integration.ts',
    './test/jest.lint.ts',
    './test/jest.prettier.ts',
    './test/jest.unit.ts',
  ],
  watchPlugins: [
    'jest-watch-select-projects',
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
}

export default jestConfig
