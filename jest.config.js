export default {
    testEnvironment: 'node',
    modulePaths: ['<rootDir>/src/'],
    globals: {

    },
    testMatch: ['<rootDir>/**/*.spec.js'],
    coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],
};