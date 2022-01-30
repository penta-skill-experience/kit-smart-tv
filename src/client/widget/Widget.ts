import {ConfigComponent} from "./ConfigComponent";
import {DisplayComponent} from "./DisplayComponent";

export interface Widget {
    getTitle(): string;
    isConfigurable(): boolean;
    getDefaultRawConfig(): Object;
    getDisplayComponentClass(): typeof DisplayComponent;
    getConfigComponentClass(): typeof ConfigComponent;
}