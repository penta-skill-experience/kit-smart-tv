import * as React from "react";
import {Widget} from "../../widget/Widget";
import {CafeteriaMenu} from "./CafeteriaMenu";
import {ConfigComponent} from "../../widget/ConfigComponent";
import {DisplayComponent} from "../../widget/DisplayComponent";

export class CafeteriaMenuWidget implements Widget {

    createConfigComponent(): typeof ConfigComponent {
        return undefined;
    }

    createDisplayComponent(): typeof DisplayComponent {
        return CafeteriaMenu;
    }

    getTitle(): string {
        return "Cafeteria Widget";
    }

    isConfigurable(): boolean {
        return false;
    }

    getDefaultRawConfig(): Object {
        return undefined;
    }
}