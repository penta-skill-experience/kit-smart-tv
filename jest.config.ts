import type {Config} from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
    verbose: true,
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    resetMocks: false,
    setupFiles: ["jest-localstorage-mock"],
    testMatch: ["**/?(*.)+(tests).[t]s?(x)"],
    collectCoverage: true,
    collectCoverageFrom:  ['src/server/**/*.{ts,tsx}', 'src/client/**/*.{ts,tsx}', 'src/shared/**/*.{ts,tsx}'],
    "moduleNameMapper": {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
        "\\.(css|less)$": "identity-obj-proxy"
    }
};
export default config;