import {WidgetData} from "../../client/widget/WidgetData";
import config from "./persistence.config.json";
import {TokenHolderSingleton} from "./TokenHolderSingleton";

export class WidgetPersistence {

    setWidgetDataList(list: WidgetData[]) {

        const myHeaders = new Headers();
        myHeaders.append("x-refresh", TokenHolderSingleton.instance.refreshToken);
        myHeaders.append("Authorization", `Bearer ${TokenHolderSingleton.instance.accessToken}`);
        myHeaders.append("Content-Type", "application/json");

        const body = {
            widgetDataList: list,
        };

        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(body),
        };

        fetch(`${config.DOMAIN}/widgets`, requestOptions)
            .catch(error => console.log('error', error));
    }

    getWidgetDataList(): Promise<WidgetData[]> {
        return fetch(`${config.DOMAIN}/widgets`)
            .then((value: Response) => value.json())
            .then(data => data.widgetDataList);
    }
}