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
                        fill: true,
                        rawConfig: {},
                    },
                    {
                        widgetId: "rss-feed",
                        location: 2,
                        fill: false,
                        rawConfig: {url: "www.example.com"},
                    },
                    {
                        widgetId: "cafeteria-menu",
                        location: 5,
                        fill: true,
                        rawConfig: {},
                    },
                ];

                resolve(data);
            }
        );
    }
}