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
        return <div className="grid grid-flow-row gap-3 box-border">
            {
                this.state.trains.length &&
                <div
                    className="pl-5 font-light leading-normal text-white text-base sm:text-xl sm:text-left lg:text-6xl">
                    {this.state.trains[0].route} {this.state.trains[0].destination}: &nbsp;&nbsp;&nbsp;{this.state.trains[0].time}
                </div>
            }
            {
                this.state.trains.slice(1, TramScheduleConfig.ITEM_COUNT).map(d =>
                    <div
                        className="pl-5 font-light leading-normal text-white text-base sm:text-xl sm:text-left lg:text-4xl">
                        {d.route} {d.destination}:   &nbsp;&nbsp;&nbsp;{d.time}
                    </div>
                )
            }
        </div>;
    }
}