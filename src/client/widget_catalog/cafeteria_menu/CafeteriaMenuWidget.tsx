import * as React from "react";
import {Widget} from "../../widget/Widget";
import {CafeteriaMenuDisplayComponent} from "./CafeteriaMenuDisplayComponent";
import {ConfigComponent} from "../../widget/ConfigComponent";
import {DisplayComponent} from "../../widget/DisplayComponent";

export class CafeteriaMenuWidget implements Widget {

    getConfigComponentClass(): typeof ConfigComponent {
        return undefined;
    }

    getDisplayComponentClass(): typeof DisplayComponent {
        return CafeteriaMenuDisplayComponent;
    }

    getTitle(): string {
        return "Cafeteria";
    }

    isConfigurable(): boolean {
        return false;
    }

    getDefaultRawConfig(): Object {
        return undefined;
    }
}