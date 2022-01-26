import {WidgetData} from "../../client/widget/WidgetData";

export class WidgetPersistence {

    setWidgetDataList(list: WidgetData[]) {
        //todo
    }

    getWidgetDataList(): Promise<WidgetData[]> {
        //todo: this is just a mock
        return new Promise<WidgetData[]>(resolve => {
                // insert data for widgets that you want to test here:
                const data = [
                    {
                        widgetId: "tram-schedule",
                        location: 1,
                        rawConfig: {stop: "Durlacher Tor"},
                    },
                    {
                        widgetId: "rss-feed",
                        location: 2,
                        rawConfig: {url: "www.example.com"},
                    },
                    {
                        widgetId: "cafeteria-menu",
                        location: 5,
                        rawConfig: {},
                    },
                    {
                        widgetId: "rss-feed",
                        location: 5,
                        rawConfig: {url: "www.example.com"},
                    },
                ];
                resolve(data);
            }
        );
    }
}