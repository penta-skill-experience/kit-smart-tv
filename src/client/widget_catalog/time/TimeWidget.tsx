import * as React from "react";
import {Widget} from "../../widget/Widget";
import {WidgetConfigSaver} from "../../widget/WidgetConfigSaver";
import {DigitalTime} from "./DigitalTime";

export class TimeWidget implements Widget {

    createConfigComponent(rawConfig: Object, saver: WidgetConfigSaver): JSX.Element {
        return undefined;
    }

    createDisplayComponent(rawConfig: Object): JSX.Element {
        return <DigitalTime />;
    }

    getTitle(): string {
        return "Time";
    }

    isConfigurable(): boolean {
        return false;
    }

}