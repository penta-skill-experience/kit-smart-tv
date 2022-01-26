import React from "react";
import {Widget} from "../../widget/Widget";
import {WidgetConfigSaver} from "../../widget/WidgetConfigSaver";
import {AnnouncementComponent} from "./AnnouncementComponent";

export class AnnouncementWidget implements Widget {

    createConfigComponent(rawConfig: Object, saver: WidgetConfigSaver): JSX.Element {
        return undefined;
    }

    createDisplayComponent(rawConfig: Object): JSX.Element {
        return <AnnouncementComponent />;
    }

    getTitle(): string {
        return "Announcements";
    }

    isConfigurable(): boolean {
        return false;
    }

}