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
                        rawConfig: {},
                    },
                    {
                        widgetId: "rss-feed",
                        location: 3,
                        rawConfig: {url: "www.example.com"},
                    },
                ];

                resolve(data);
            }
        );
    }
}