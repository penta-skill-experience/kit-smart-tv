import {WidgetData} from "../../client/widget/WidgetData";
import config from "./persistence.config.json";

export class WidgetPersistence {

    setWidgetDataList(list: WidgetData[]) {
        console.log(list);
        //todo
    }

    getWidgetDataList(): Promise<WidgetData[]> {
        return fetch(`${config.DOMAIN}/widgets`)
            .then((value: Response) => value.json())
            .then(data => data.widgetDataList);
    }
}