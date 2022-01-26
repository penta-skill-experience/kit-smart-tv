import * as React from "react";
import {Widget} from "../../widget/Widget";
import {WidgetConfigSaver} from "../../widget/WidgetConfigSaver";
import {CafeteriaOpening} from "./CafeteriaOpening";

export class CafeteriaOpeningWidget implements Widget {

    createConfigComponent(rawConfig: Object, saver: WidgetConfigSaver): JSX.Element {
        return undefined;
    }

    createDisplayComponent(rawConfig: Object): JSX.Element {
        return <CafeteriaOpening />;
    }

    getTitle(): string {
        return "Cafeteria Widget";
    }

    isConfigurable(): boolean {
        return true;
    }
}