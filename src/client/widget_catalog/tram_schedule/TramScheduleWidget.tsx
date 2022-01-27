import * as React from "react";
import {Widget} from "../../widget/Widget";
import {TramScheduleDisplayComponent} from "./TramScheduleDisplayComponent";
import {TramScheduleConfig} from "./TramScheduleConfig";
import {ConfigComponent} from "../../widget/ConfigComponent";
import {TramScheduleConfigComponent} from "./TramScheduleConfigComponent";
import {DisplayComponent} from "../../widget/DisplayComponent";

export class TramScheduleWidget implements Widget {

    createConfigComponent(): typeof ConfigComponent {
        return TramScheduleConfigComponent;
    }

    createDisplayComponent(): typeof DisplayComponent {
        return TramScheduleDisplayComponent;
    }

    getTitle(): string {
        return "Tram Schedule";
    }

    isConfigurable(): boolean {
        return true;
    }

    getDefaultRawConfig(): Object {
        const config = new TramScheduleConfig();
        return config.save();
    }
}