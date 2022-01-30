import * as React from "react";
import {Widget} from "../../widget/Widget";
import {CafeteriaOpeningDisplayComponent} from "./CafeteriaOpeningDisplayComponent";
import {ConfigComponent} from "../../widget/ConfigComponent";
import {DisplayComponent} from "../../widget/DisplayComponent";

export class CafeteriaOpeningWidget implements Widget {

    getConfigComponentClass(): typeof ConfigComponent {
        return undefined;
    }

    getDisplayComponentClass(): typeof DisplayComponent {
        return CafeteriaOpeningDisplayComponent;
    }

    getTitle(): string {
        return "Cafeteria Status";
    }

    isConfigurable(): boolean {
        return false;
    }

    getDefaultRawConfig(): Object {
        return undefined;
    }
}