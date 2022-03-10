import * as TramScheduleConfig from "./TramSchedule.json";
import config from "../../../shared/persistence/persistence.config.json";

export class TramScheduleUtility {

    static requestStops(stopNameSearchString: string): Promise<Response> {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const requestOptions = {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify({
                url: TramScheduleConfig.URL_STOP_SEARCH_BEFORE_STOP
                    + encodeURIComponent(`"${stopNameSearchString.replace("/", "_")}"`)  // slashes need to be replaced by underscore, everything else can be escaped with encodeURIComponent()
                    + TramScheduleConfig.URL_STOP_SEARCH_AFTER_STOP
                    + TramScheduleConfig.API_KEY
            })
        };
        return fetch(`${config.DOMAIN}/kvv`, requestOptions);
    }

    static requestDepartureData(stopId: string): Promise<Response> {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const requestOptions = {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify({
                url: TramScheduleConfig.URL_BEFORE_STOP
                    + stopId
                    + TramScheduleConfig.URL_AFTER_STOP
                    + TramScheduleConfig.API_KEY
            })
        };
        return fetch(`${config.DOMAIN}/kvv`, requestOptions);
    }

    static requestStopName(stopId: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.requestDepartureData(stopId)
                .then((value: Response) => value.json().catch(reason => reject(reason)))
                .then(data => {
                    if (data) {
                        resolve(data["stopName"]);
                    } else {
                        reject(`No data returned by KVV API for stop ID "${stopId}"`);
                    }
                })
                .catch(reason => reject(reason));
        });
    }
}