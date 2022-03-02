import type {Config} from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
    verbose: true,
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    testMatch: ["**/api_tests/?(*.)+(tests).[t]s?(x)"]
};
export default config;