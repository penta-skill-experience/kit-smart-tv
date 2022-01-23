import * as React from "react";
import {Widget} from "../../widget/Widget";
import {WidgetConfigSaver} from "../../widget/WidgetConfigSaver";
import {TramSchedule} from "./TramSchedule";

export class TramScheduleWidget implements Widget {

    createConfigComponent(rawConfig: Object, saver: WidgetConfigSaver): JSX.Element {
        return undefined;
    }

    createDisplayComponent(rawConfig: Object): JSX.Element {
        return <TramSchedule />;
    }

    getTitle(): string {
        return "Tram Schedule";
    }

    isConfigurable(): boolean {
        return true;
    }

    getFill(): boolean{
        return true;
    }
}