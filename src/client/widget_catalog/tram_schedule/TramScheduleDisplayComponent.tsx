import * as React from "react";
import * as TramScheduleConfig from "./TramSchedule.json";
import {DisplayComponent} from "../../widget/DisplayComponent";
import {TramScheduleUtility} from "./TramScheduleUtility";

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

    private querySchedule() {
        const stopName = this.getStopName();
        TramScheduleUtility.requestStops(stopName)
            .then((resp: Response) => {
                if (resp.ok) {
                    return resp.json()
                        .catch(reason => this.props.error(reason));
                } else {
                    resp.text().then(responseText => {
                        this.props.error(`Failed to get tram schedule from server (status: ${resp.status} ${resp.statusText}). Reason: ${responseText}`);
                    });
                }
            })
            .then(data => {
                if (data.stops.length == 0) {
                    this.props.error(`The stop "${stopName}" does not exist.`);
                } else {
                    return this.queryDepartureData(data.stops[0].id);
                }
            })
            .catch(reason => {
                this.props.error(`Failed to get tram schedule from server. Reason: ${reason}`);
            });
    };

    private queryDepartureData(stopId: string) {
        TramScheduleUtility.requestDepartureData(stopId)
            .then((value: Response) => value.json().catch(reason => this.props.error(reason)))
            .then(data => {
                this.setState({
                    trains: data.departures.map(d => ({
                        route: d.route,
                        destination: d.destination,
                        time: justArrived(d.time)
                    }))
                });
            });
    }

    private getStopName(): string {
        return this.props.config["stop"];
    }

    private getConfigCount(): number {
        return this.props.config["count"] || 4;
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
            <div className="font-light leading-normal sm:text-sm sm:text-center lg:text-base xl:text-xl 2xl:text-2xl
             4xl:text-3xl 8xl:text-5xl sm:-mt-1 lg:-mt-2 xl:-mt-3 4xl:-mt-4 8xl:-mt-5">  {this.getStopName()}
            </div>
            {
                this.state.trains.length &&
                <div
                    className="font-light leading-normal sm:text-sm sm:text-left lg:text-base xl:text-xl 2xl:text-2xl 4xl:text-3xl 8xl:text-5xl">
                    {this.state.trains[0].route} {this.state.trains[0].destination}: &nbsp;&nbsp;&nbsp;{this.state.trains[0].time}
                </div>
            }
            {
                this.state.trains.slice(1, this.getConfigCount()).map((d, index) =>
                    <div key={index}
                         className="font-light leading-normal sm:text-xs lg:text-base xl:text-base 2xl:text-xl 4xl:text-2xl sm:text-left 8xl:text-4xl">
                        {d.route} {d.destination}: &nbsp;&nbsp;&nbsp;{d.time}
                    </div>
                )
            }
        </div>;
    }
}