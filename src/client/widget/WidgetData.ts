export class WidgetData {

    widgetId: string;
    location: number;
    fill: boolean;
    rawConfig: Object;

    constructor(widgetId: string, location: number, fill: boolean, rawConfig: Object) {
        this.widgetId = widgetId;
        this.location = location;
        this.fill = fill;
        this.rawConfig = rawConfig;
    }
}