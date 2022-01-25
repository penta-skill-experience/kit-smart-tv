import type {Config} from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
    verbose: true,
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    testMatch: ["**/announcement_management_tests/SetAnnouncementCommand.tests.ts"]
};
export default config;