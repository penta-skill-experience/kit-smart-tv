import React from "react";
import {Widget} from "../../widget/Widget";
import {AnnouncementComponent} from "./AnnouncementComponent";
import {ConfigComponent} from "../../widget/ConfigComponent";
import {DisplayComponent} from "../../widget/DisplayComponent";

export class AnnouncementWidget implements Widget {

    getConfigComponentClass(): typeof ConfigComponent {
        return undefined;
    }

    getDisplayComponentClass(): typeof DisplayComponent {
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