import {Widget} from "./Widget";
import {RssFeedWidget} from "../widget_catalog/rss-feed/RssFeedWidget";
import {TramScheduleWidget} from "../widget_catalog/tram-schedule/TramScheduleWidget";
import {WeatherWidget} from "../widget_catalog/weather/WeatherWidget";

export class WidgetLoader {

    private readonly widgets = new Map<string, Widget>();

    constructor() {
        this.widgets.set("rss-feed", new RssFeedWidget());
        this.widgets.set("tram-schedule", new TramScheduleWidget());
        this.widgets.set("weather", new WeatherWidget());
    }

    getWidgetIds(): string[] {
        return Array.from(this.widgets.keys());
    }

    getWidget(widgetId: string): Widget {
        if (this.widgets.has(widgetId)) {
            return this.widgets.get(widgetId);
        } else {
            throw new Error(`no widget with ID "${widgetId}" registered`);
        }
    }
}