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
    departures: DepartureData[];
    stopName: string;
}

export class TramScheduleDisplayComponent extends DisplayComponent<TramScheduleState> {

    private intervalHandle;  // need to keep a reference to the interval in order to clear it when unmounting the component

    constructor(props) {
        super(props);
        this.state = {
            departures: [],
            stopName: "unknown",
        };
    }

    private queryDepartureData() {

        const stopId = this.props.config["stop"];

        TramScheduleUtility.requestDepartureData(stopId)
            .then((value: Response) => value.json().catch(reason => this.props.error(reason)))
            .then(data => {
                if (!data) {
                    this.props.error(`No data returned by KVV API for stop ID "${stopId}"`);
                } else {
                    this.setState({
                        stopName: data["stopName"],
                        departures: data["departures"].map(d => ({
                            route: d.route,
                            destination: d.destination,
                            time: justArrived(d.time)
                        })),
                    });
                }
            });
    }
    private getConfigCount(): number {
        return this.props.config["count"] || 4;
    }

    componentDidMount() {
        this.queryDepartureData();
        this.intervalHandle = setInterval(() => this.queryDepartureData(), TramScheduleConfig.REFRESH_RATE);
    }


    componentWillUnmount() {
        clearInterval(this.intervalHandle);
    }

    render() {
        return <div className="grid grid-flow-row sm:g-0.5 xl:gap-1.5 2xl:gap-2 box-border">
            <div className="font-light leading-none sm:text-sm sm:text-center lg:text-base xl:text-xl 2xl:text-2xl
             4xl:text-3xl 8xl:text-5xl sm:pb-1 lg:pb-2 xl:pb-3 4xl:pb-4">  {this.state.stopName}
            </div>
            {
                ((!this.state.departures.length) ? <div className="font-light leading-normal sm:text-sm sm:text-left lg:text-base xl:text-xl 2xl:text-2xl 4xl:text-3xl 8xl:text-5xl">
                No Trains Currently
                </div>:
                    <div
                        className="font-light leading-normal sm:text-sm sm:text-left lg:text-base xl:text-xl 2xl:text-2xl 4xl:text-3xl 8xl:text-5xl">
                        {this.state.departures[0].route} {this.state.departures[0].destination}: &nbsp;&nbsp;&nbsp;{this.state.departures[0].time}
                    </div>
                )

            }
            {
                this.state.departures.slice(1, this.getConfigCount()).map((d, index) =>
                    <div key={index}
                         className="font-light leading-normal sm:text-xs lg:text-base xl:text-base 2xl:text-xl 4xl:text-2xl sm:text-left 8xl:text-4xl">
                        {d.route} {d.destination}: &nbsp;&nbsp;&nbsp;{d.time}
                    </div>
                )
            }
        </div>;
    }
}