import {WidgetData} from "../../client/widget/WidgetData";

export class WidgetPersistence {

    setWidgetDataList(list: WidgetData[]) {
        console.log(list);
        //todo
    }

    async getWidgetDataList(): Promise<WidgetData[]> {
        //todo: this is just a mock

        const response = await fetch('http://localhost:80/widgets');
        const myJson = await response.json();

        return new Promise<WidgetData[]>(resolve => {
                resolve(myJson);
            }
        );
    }
}