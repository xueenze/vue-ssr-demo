const path = require('path');

module.exports = {
    verbose: true,
    testURL: 'http://localhost/',
    rootDir: path.resolve(__dirname, '../../'),
    moduleFileExtensions: [
        'js',
        'json',
        'vue',
    ],
    moduleNameMapper: {
        '^@\/(.*?\.?(js|vue)?|)$': '<rootDir>/src/$1',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/test/unit/__mocks__/fileMock.js',
        '\\.(css|less)$': 'identity-obj-proxy',
    },
    testMatch: [
        '<rootDir>/test/unit/**/*.spec.js',
    ],
    transform: {
        '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
        '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
    },
    testPathIgnorePatterns: [
        '<rootDir>/test/e2e',
    ],
    snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue', ],
    coverageDirectory: '<rootDir>/test/unit/coverage',
    collectCoverageFrom: [
        'src/views/**/*.(js|vue)',
        'src/components/**/*.(js|vue)',
        '!src/main.js',
        '!src/router/index.js',
        '!**/node_modules/**',
    ],
};
