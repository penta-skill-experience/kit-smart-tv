import {WidgetData} from "../../client/widget/WidgetData";

export class WidgetPersistence {

    setWidgetDataList(list: WidgetData[]) {
        console.log(list);
        //todo
    }

    async getWidgetDataList(): Promise<WidgetData[]> {
        return fetch(`http://localhost:80/widgets`)
            .then((value: Response) => value.json())
            .then(data => data.widgetDataList);
    }
}