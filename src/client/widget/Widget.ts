import {WidgetConfigSaver} from "./WidgetConfigSaver";

export interface Widget {
    getTitle(): string;
    isConfigurable(): boolean;
    getFill(): boolean;
    createDisplayComponent(rawConfig: Object): JSX.Element;
    createConfigComponent(rawConfig: Object, saver: WidgetConfigSaver): JSX.Element;
}