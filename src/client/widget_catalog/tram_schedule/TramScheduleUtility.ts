import * as TramScheduleConfig from "./TramSchedule.json";
import config from "../../../shared/persistence/persistence.config.json";

export class TramScheduleUtility {

    static requestStops(text: string) {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const requestOptions = {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify({
                url: TramScheduleConfig.URL_STOP_SEARCH_BEFORE_STOP
                    + encodeURIComponent(`"${text.replace("/", "_")}"`)  // slashes need to be replaced by underscore, everything else can be escaped with encodeURIComponent()
                    + TramScheduleConfig.URL_STOP_SEARCH_AFTER_STOP
                    + TramScheduleConfig.API_KEY
            })
        };
        return fetch(`${config.DOMAIN}/kvv`, requestOptions);
    }
}