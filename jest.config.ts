export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    modulePaths: ['<rootDir>/src/'],
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.json',
      },
    },
    testMatch: ['<rootDir>/**/*.spec.ts'],
    coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],
};