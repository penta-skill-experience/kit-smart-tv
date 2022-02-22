import type {Config} from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
    verbose: true,
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testMatch: ["**/?(*.)+(tests).[t]s?(x)"],
    collectCoverage: true,
    collectCoverageFrom:  ['src/server/**/*.{ts,tsx}', 'src/client/**/*.{ts,tsx}', 'src/shared/**/*.{ts,tsx}']
};
export default config;