import type {Config} from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
    verbose: true,
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testMatch: ["**/config_website/?(*.)+(tests).[t]s?(x)"]
};
export default config;