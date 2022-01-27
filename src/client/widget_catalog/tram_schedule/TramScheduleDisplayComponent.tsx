import * as React from "react";
import * as TramScheduleConfig from "./TramSchedule.json";
import axios from "axios"
import {DisplayComponent} from "../../widget/DisplayComponent";

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
    constructor(props) {
        super(props);
        this.state = {
            trains: [],
            stopId: undefined,
        };
        console.log("TramScheduleDisplayComponent received the following config:");
        console.log(this.props.config);
    }

    private getStopName(): string {
        return this.props.config["stop"]["label"];
    }

    private querySchedule() {
        if (this.state.stopId === undefined) {
            // get stopId before querying departure data

            const stopName = this.getStopName();

            let url = "http://localhost:8080/" + TramScheduleConfig.URL_STOP_SEARCH_BEFORE_STOP
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

        } else {
            // immediately query departure data
            this.queryDepartureData();
        }
    };

    private queryDepartureData() {
        axios.get(TramScheduleConfig.CORS_ANYWHERE
            + TramScheduleConfig.URL_BEFORE_STOP
            + this.state.stopId
            + TramScheduleConfig.URL_AFTER_STOP
            + TramScheduleConfig.API_KEY)
            .then(resp => {
                console.log(this.state.stopId);
                this.setState({
                    trains: resp.data.departures.map(d => ({
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
        setInterval(() => this.querySchedule(), TramScheduleConfig.REFRESH_RATE);
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