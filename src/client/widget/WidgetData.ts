export class WidgetData {

    widgetId: string;
    location: number;
    rawConfig: Object;

    constructor(widgetId: string, location: number, rawConfig: Object) {
        this.widgetId = widgetId;
        this.location = location;
        this.rawConfig = rawConfig;
    }
}