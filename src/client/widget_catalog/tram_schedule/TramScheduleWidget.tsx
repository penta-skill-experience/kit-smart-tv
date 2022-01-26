import * as React from "react";
import {Widget} from "../../widget/Widget";
import {TramScheduleDisplayComponent} from "./TramScheduleDisplayComponent";
import {TramScheduleConfig} from "./TramScheduleConfig";
import {TramScheduleConfigDialogComponent} from "../../config_website/widget_config_pages/TramScheduleConfigPage";

export class TramScheduleWidget implements Widget {

    createConfigComponent(rawConfig: Object, save: (rawConfig: Object) => void): JSX.Element {
        return <TramScheduleConfigDialogComponent/>;
    }

    createDisplayComponent(rawConfig: Object): JSX.Element {
        const config = new TramScheduleConfig();
        config.load(rawConfig);
        return <TramScheduleDisplayComponent
            stop={config.stop}
        />;
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