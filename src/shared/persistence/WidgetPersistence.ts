import {WidgetData} from "../../client/widget/WidgetData";
import config from "./persistence.config.json";
import {TokenHolderSingleton} from "./TokenHolderSingleton";

export class WidgetPersistence {

    setWidgetDataList(list: WidgetData[]): Promise<Response> {

        const headers = new Headers();
        headers.append("x-refresh", TokenHolderSingleton.instance.refreshToken);
        headers.append("Authorization", `Bearer ${TokenHolderSingleton.instance.accessToken}`);
        headers.append("Content-Type", "application/json");

        const body = {widgetDataList: list};

        const requestOptions = {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(body),
        };

        return fetch(`${config.DOMAIN}/widgets`, requestOptions);
    }

    getWidgetDataList(): Promise<WidgetData[]> {
        return fetch(`${config.DOMAIN}/widgets`)
            .then((value: Response) => value.json())
            .then(data => data.widgetDataList);
    }
}