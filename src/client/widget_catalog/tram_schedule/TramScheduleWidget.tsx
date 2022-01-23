import * as React from "react";
import {Widget} from "../../widget/Widget";
import {WidgetConfigSaver} from "../../widget/WidgetConfigSaver";
import {TramSchedule} from "./TramSchedule";
import {TramScheduleConfig} from "./TramScheduleConfig";

export class TramScheduleWidget implements Widget {

    createConfigComponent(rawConfig: Object, saver: WidgetConfigSaver): JSX.Element {
        return undefined;
    }

    createDisplayComponent(rawConfig: Object): JSX.Element {
        const config = new TramScheduleConfig();
        config.load(rawConfig);
        return <TramSchedule
            stop={config.stop}
        />;
    }

    getTitle(): string {
        return "Tram Schedule";
    }

    isConfigurable(): boolean {
        return true;
    }
}