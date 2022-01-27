import * as React from "react";
import {Widget} from "../../widget/Widget";
import {DigitalTime} from "./DigitalTime";
import {ConfigComponent} from "../../widget/ConfigComponent";
import {DisplayComponent} from "../../widget/DisplayComponent";

export class TimeWidget implements Widget {

    createConfigComponent(): typeof ConfigComponent {
        return undefined;
    }

    createDisplayComponent(): typeof DisplayComponent {
        return DigitalTime;
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