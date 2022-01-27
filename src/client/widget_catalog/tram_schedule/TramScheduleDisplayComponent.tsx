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
    stopId: string | undefined;
}

export class TramScheduleDisplayComponent extends DisplayComponent<TramScheduleState> {

    private intervalHandle;  // need to keep a reference to the interval in order to clear it when unmounting the component

    constructor(props) {
        super(props);
        this.state = {
            trains: [],
            stopId: undefined,
        };
    }

    private getStopName(): string {
        return this.props.config["stop"]["label"];
    }

    private querySchedule() {
        if (this.state.stopId === undefined) {
            // get stopId before querying departure data
            /*
            const stopName = this.getStopName();

            let url = TramScheduleConfig.CORS_ANYWHERE + TramScheduleConfig.URL_STOP_SEARCH_BEFORE_STOP
                + stopName
                + TramScheduleConfig.URL_STOP_SEARCH_AFTER_STOP
                + TramScheduleConfig.API_KEY;
            axios.get(url)
                .then(resp => {
                    let checker = resp.data.stops;
                    if (checker.length == 0) {
                        throw new Error(`The stop ${stopName} does not exist`);
                    }
                    let stopId = checker[0].id;
                    this.setState({
                        stopId: stopId,
                    });
                });

             */
            this.queryDepartureData();//remove later
        } else {
            // immediately query departure data
            this.queryDepartureData();
        }
    };

    private queryDepartureData() {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");


        const urlLink = "https://live.kvv.de/webapp/departures/bystop/MPU?maxInfos=10&key=377d840e54b59adbe53608ba1aad70e8";
        let body = {url: urlLink};
        console.log(urlLink);
        console.log(JSON.stringify(body));
        const requestOptions = {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(body)
        };
        return fetch(`${config.DOMAIN}/kvv`, requestOptions)
            .then((value: Response) => value.json()).then(data => {
                console.log(data);
                this.setState({
                    trains: data.departures.map(d => ({
                        route: d.route,
                        destination: d.destination,
                        time: justArrived(d.time)
                    })),
                    stop: this.state.stopId
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