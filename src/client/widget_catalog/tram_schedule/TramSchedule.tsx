import * as React from "react";
import * as TramScheduleConfig from "./TramSchedule.json";
import axios from "axios"

interface DepartureData {
    route: string;
    destination: string;
    time: string;
}

interface TramScheduleState {
    trains: DepartureData[];
}

let justArrived = (x: string): string => {
    if (/^-?\d+$/.test(x) && Number(x) == 0) {
        return "now!"
    }
    return x;
};

export class TramSchedule extends React.Component<any, TramScheduleState> {
    constructor(props) {
        super(props);
        this.state = {
            trains: []
        };
    }

    getSchedule() {
        axios.get(TramScheduleConfig.CORS_ANYWHERE + TramScheduleConfig.URL)
            .then(resp => {
                this.setState({
                    trains: resp.data.departures.map(d => ({
                        route: d.route,
                        destination: d.destination,
                        time: justArrived(d.time)
                    })),
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        this.getSchedule();
        setInterval(() => this.getSchedule(), TramScheduleConfig.REFRESH_RATE);
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
                this.state.trains.slice(1, TramScheduleConfig.ITEM_COUNT).map(d =>
                    <div
                        className="font-light leading-normal sm:text-xs lg:text-base xl:text-base 2xl:text-xl 4xl:text-2xl sm:text-left 8xl:text-4xl">
                        {d.route} {d.destination}: &nbsp;&nbsp;&nbsp;{d.time}
                    </div>
                )
            }
        </div>;
    }
}