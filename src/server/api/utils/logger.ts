import * as logger from "pino";
import * as dayjs from "dayjs";

// @ts-ignore
const log = logger({
    prettyPrint: true,
    base: {
        pid: false,
    },
    timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;