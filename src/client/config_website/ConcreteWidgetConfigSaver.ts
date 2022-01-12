import {WidgetConfigSaver} from "../widget/WidgetConfigSaver";

export class ConcreteWidgetConfigSaver implements WidgetConfigSaver {

    save(rawConfig: Object): void {
        // todo
        console.log("save widget config:");
        console.log(rawConfig);
    }
}