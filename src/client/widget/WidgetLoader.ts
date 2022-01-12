import {Widget} from "./Widget";
import {RssFeedWidget} from "../widget_catalog/RssFeedWidget";

export class WidgetLoader {

    private readonly widgets = new Map<string, Widget>();

    constructor() {
        this.widgets.set("rss-feed", new RssFeedWidget());
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