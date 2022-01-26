import {WidgetConfigSaver} from "../widget/WidgetConfigSaver";

export class ConcreteWidgetConfigSaver implements WidgetConfigSaver {

    save(rawConfig: Object): void {

        // todo write to persistence
        console.log("save widget config:");
        console.log(rawConfig);
    }
}