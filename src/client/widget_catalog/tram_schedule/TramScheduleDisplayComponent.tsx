import * as React from "react";
import * as TramScheduleConfig from "./TramSchedule.json";
import {DisplayComponent} from "../../widget/DisplayComponent";
import config from "../../../shared/persistence/persistence.config.json";

interface DepartureData {
    route: string;
    destination: string;
    time: string;
}

let justArrived = (x: string): string => {
    if (/^-?\d+$/.test(x) && Number(x) == 0) {
        return "now!"
    }
    return x;
};

interface TramScheduleState {
    trains: DepartureData[];
}

export class TramScheduleDisplayComponent extends DisplayComponent<TramScheduleState> {

    private intervalHandle;  // need to keep a reference to the interval in order to clear it when unmounting the component

    constructor(props) {
        super(props);
        this.state = {
            trains: [],
        };
    }

    private getStopName(): string {
        return this.props.config["stop"]["label"];
    }

    private querySchedule() {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            const stopName = this.getStopName();
            let urlLink = TramScheduleConfig.URL_STOP_SEARCH_BEFORE_STOP
                + encodeURIComponent(stopName)
                + TramScheduleConfig.URL_STOP_SEARCH_AFTER_STOP
                + TramScheduleConfig.API_KEY;
            const body = {url: urlLink};
            const requestOptions = {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(body)
            };
            return fetch(`${config.DOMAIN}/kvv`, requestOptions)
                .then((value: Response) => value.json()).then(data => {
                    let checker = data.stops;
                    if (checker.length == 0) {
                        throw new Error(`The stop ${stopName} does not exist`);
                    }
                    this.queryDepartureData(checker[0].id);
                });
        };

    private queryDepartureData(stopId: string) {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const urlLink = TramScheduleConfig.URL_BEFORE_STOP
            + stopId
            + TramScheduleConfig.URL_AFTER_STOP
            + TramScheduleConfig.API_KEY;
        const body = {url: urlLink};
        const requestOptions = {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(body)
        };
        return fetch(`${config.DOMAIN}/kvv`, requestOptions)
            .then((value: Response) => value.json()).then(data => {
                this.setState({
                    trains: data.departures.map(d => ({
                        route: d.route,
                        destination: d.destination,
                        time: justArrived(d.time)
                    }))
                });
            });
    }

    componentDidMount() {
        this.querySchedule();
        this.intervalHandle = setInterval(() => this.querySchedule(), TramScheduleConfig.REFRESH_RATE);
    }


    componentWillUnmount() {
        clearInterval(this.intervalHandle);
    }

    render() {
        return <div className="grid grid-flow-row sm:g-0.5 xl:gap-1.5 2xl:gap-2 box-border">
            {
                this.state.trains.length &&
                <div
                    className="font-light leading-normal sm:text-sm sm:text-left lg:text-base xl:text-xl 2xl:text-2xl 4xl:text-3xl 8xl:text-5xl">
                    {this.state.trains[0].route} {this.state.trains[0].destination}: &nbsp;&nbsp;&nbsp;{this.state.trains[0].time}
                </div>
            }
            {
                this.state.trains.slice(1, TramScheduleConfig.ITEM_COUNT).map((d, index) =>
                    <div key={index}
                         className="font-light leading-normal sm:text-xs lg:text-base xl:text-base 2xl:text-xl 4xl:text-2xl sm:text-left 8xl:text-4xl">
                        {d.route} {d.destination}: &nbsp;&nbsp;&nbsp;{d.time}
                    </div>
                )
            }
        </div>;
    }
}