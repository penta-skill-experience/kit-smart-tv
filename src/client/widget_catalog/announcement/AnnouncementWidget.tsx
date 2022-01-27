import React from "react";
import {Widget} from "../../widget/Widget";
import {AnnouncementComponent} from "./AnnouncementComponent";
import {ConfigComponent} from "../../widget/ConfigComponent";
import {DisplayComponent} from "../../widget/DisplayComponent";

export class AnnouncementWidget implements Widget {

    createConfigComponent(): typeof ConfigComponent {
        return undefined;
    }

    createDisplayComponent(): typeof DisplayComponent {
        return AnnouncementComponent;
    }

    getTitle(): string {
        return "Announcements";
    }

    isConfigurable(): boolean {
        return false;
    }

    getDefaultRawConfig(): Object {
        return undefined;
    }
}