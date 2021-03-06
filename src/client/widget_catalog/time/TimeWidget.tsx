import * as React from "react";
import {Widget} from "../../widget/Widget";
import {TimeDisplayComponent} from "./TimeDisplayComponent";
import {ConfigComponent} from "../../widget/ConfigComponent";
import {DisplayComponent} from "../../widget/DisplayComponent";

export class TimeWidget implements Widget {

    getConfigComponentClass(): typeof ConfigComponent {
        return undefined;
    }

    getDisplayComponentClass(): typeof DisplayComponent {
        return TimeDisplayComponent;
    }

    getTitle(): string {
        return "Time";
    }

    isConfigurable(): boolean {
        return false;
    }

    getDefaultRawConfig(): Object {
        return undefined;
    }
}