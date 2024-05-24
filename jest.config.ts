export default {
  testEnvironment: 'node',
  collectCoverage: false,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleNameMapper: {
    '@/constants': '<rootDir>/src/main/config/constants',
    '@/tests/(.+)': '<rootDir>/tests/$1',
    '@/(.+)': '<rootDir>/src/$1',
  },
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.(spec|test).ts'],
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  fakeTimers: {
    enableGlobally: true,
  },
}
