import {WidgetConfigSaver} from "./WidgetConfigSaver";

export interface Widget {
    getTitle(): string;
    isConfigurable(): boolean;
    getDefaultRawConfig(): Object;
    createDisplayComponent(rawConfig: Object): JSX.Element;
    createConfigComponent(rawConfig: Object, save: (rawConfig: Object) => void): JSX.Element;
}