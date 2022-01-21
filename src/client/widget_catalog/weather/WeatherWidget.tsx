import * as React from "react";
import {Widget} from "../../widget/Widget";
import {WidgetConfigSaver} from "../../widget/WidgetConfigSaver";
import {Weather} from "./Weather";

export class WeatherWidget implements Widget {

    createConfigComponent(rawConfig: Object, saver: WidgetConfigSaver): JSX.Element {
        return undefined;
    }

    createDisplayComponent(rawConfig: Object): JSX.Element {
        return <Weather/>;
    }

    getTitle(): string {
        return "Weather";
    }

    isConfigurable(): boolean {
        return false;
    }

}