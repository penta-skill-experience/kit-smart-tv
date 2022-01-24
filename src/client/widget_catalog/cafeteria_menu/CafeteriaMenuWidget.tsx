import * as React from "react";
import {Widget} from "../../widget/Widget";
import {WidgetConfigSaver} from "../../widget/WidgetConfigSaver";
import {CafeteriaMenu} from "./CafeteriaMenu";

export class CafeteriaMenuWidget implements Widget {

    createConfigComponent(rawConfig: Object, saver: WidgetConfigSaver): JSX.Element {
        return undefined;
    }

    createDisplayComponent(rawConfig: Object): JSX.Element {
        return <CafeteriaMenu />;
    }

    getTitle(): string {
        return "Cafeteria Widget";
    }

    isConfigurable(): boolean {
        return true;
    }
}