import {WidgetConfig} from "../WidgetConfig";

export class TramScheduleConfig implements WidgetConfig {
    stop: string;

    save(): Object {
        return {
            stop: this.stop,
        };
    }

    load(raw: Object) {
        if (raw.hasOwnProperty("stop")) {
            this.stop = raw["stop"];
        } else {
            throw new Error(`could not load Tram Schedule Config from raw data: ${raw}`);
        }
    }
}