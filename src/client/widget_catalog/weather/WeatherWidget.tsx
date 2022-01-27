import * as React from "react";
import {Widget} from "../../widget/Widget";
import {WeatherDisplayComponent} from "./WeatherDisplayComponent";
import {ConfigComponent} from "../../widget/ConfigComponent";
import {DisplayComponent} from "../../widget/DisplayComponent";

export class WeatherWidget implements Widget {

    createConfigComponent(): typeof ConfigComponent {
        return undefined;
    }

    createDisplayComponent(): typeof DisplayComponent {
        return WeatherDisplayComponent;
    }

    getTitle(): string {
        return "Weather";
    }

    isConfigurable(): boolean {
        return false;
    }

    getDefaultRawConfig(): Object {
        return undefined;
    }
}