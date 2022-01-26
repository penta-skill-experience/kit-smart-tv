import {Widget} from "../../widget/Widget";
import {WidgetConfigSaver} from "../../widget/WidgetConfigSaver";

export class AnnouncementWidget implements Widget {

    createConfigComponent(rawConfig: Object, saver: WidgetConfigSaver): JSX.Element {
        return undefined;
    }

    createDisplayComponent(rawConfig: Object): JSX.Element {
        return undefined;
    }

    getTitle(): string {
        return "Announcements";
    }

    isConfigurable(): boolean {
        return false;
    }

}