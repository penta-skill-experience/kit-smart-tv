import {Widget} from "./Widget";
import {RssFeedWidget} from "../widget_catalog/rss_feed/RssFeedWidget";
import {TramScheduleWidget} from "../widget_catalog/tram_schedule/TramScheduleWidget";
import {WeatherWidget} from "../widget_catalog/weather/WeatherWidget";
import {TimeWidget} from "../widget_catalog/time/TimeWidget";
import {CafeteriaMenuWidget} from "../widget_catalog/cafeteria_menu/CafeteriaMenuWidget";
import {CafeteriaOpeningWidget} from "../widget_catalog/cafeteria_opening/CafeteriaOpeningWidget";

export class WidgetLoader {

    private readonly widgets = new Map<string, Widget>();

    constructor() {
        this.widgets.set("rss-feed", new RssFeedWidget());
        this.widgets.set("tram-schedule", new TramScheduleWidget());
        this.widgets.set("weather", new WeatherWidget());
        this.widgets.set("time", new TimeWidget());
        this.widgets.set("cafeteria-menu", new CafeteriaMenuWidget());
        this.widgets.set("cafeteria-opening", new CafeteriaOpeningWidget());
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