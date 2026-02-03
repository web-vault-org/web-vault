export default {
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  clearMocks: true,
  testMatch: ['**/tests/**/*.spec.ts'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/lib/$1',
    '#/(.*)': '<rootDir>/tests/$1'
  },
  modulePathIgnorePatterns: ['<rootDir>/built', '<rootDir>/frontend']
};
