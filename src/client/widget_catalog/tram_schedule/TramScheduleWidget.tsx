import * as React from "react";
import {Widget} from "../../widget/Widget";
import {TramScheduleDisplayComponent} from "./TramScheduleDisplayComponent";
import {ConfigComponent} from "../../widget/ConfigComponent";
import {TramScheduleConfigComponent} from "./TramScheduleConfigComponent";
import {DisplayComponent} from "../../widget/DisplayComponent";
import * as TramScheduleConfig from "./TramSchedule.json";

export class TramScheduleWidget implements Widget {

    getConfigComponentClass(): typeof ConfigComponent {
        return TramScheduleConfigComponent;
    }

    getDisplayComponentClass(): typeof DisplayComponent {
        return TramScheduleDisplayComponent;
    }

    getTitle(): string {
        return "Tram Schedule";
    }

    isConfigurable(): boolean {
        return true;
    }

    getDefaultRawConfig(): Object {
        return {
            stop: "",
            count: TramScheduleConfig.DEFAULT_ITEM_COUNT,
        };
    }
}