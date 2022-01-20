import * as React from "react";
import * as TramScheduleConfig from "./TramSchedule.json";
import axios from "axios"

export class TramSchedule extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
            train0: ["", "",0],
            train1: ["", "",0],
            train2: ["", "",0],
            train3: ["", "",0],
            train4: ["", "",0]
        };
    }
    async getSchedule() {
        await axios.get(TramScheduleConfig.CORS_ANYWHERE + TramScheduleConfig.URL, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin",
                'Origin': 'www.example.com'
            }
        })
            .then(resp => {
                console.log(resp.data);
                this.setState({
                    train0: [resp.data.departures[0].route, resp.data.departures[0].destination,resp.data.departures[0].time],
                    train1: [resp.data.departures[1].route, resp.data.departures[1].destination,resp.data.departures[1].time],
                    train2: [resp.data.departures[2].route, resp.data.departures[2].destination,resp.data.departures[2].time],
                    train3: [resp.data.departures[3].route, resp.data.departures[3].destination,resp.data.departures[3].time],
                    train4: [resp.data.departures[4].route, resp.data.departures[4].destination,resp.data.departures[4].time]
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
            <div className="pl-5 font-light leading-normal text-white text-base sm:text-xl sm:text-left lg:text-6xl">
                {this.state.train0[0]} {this.state.train0[1]}: &nbsp;&nbsp;&nbsp;{this.state.train0[2]}
            </div>
            <div className="pl-5 font-light leading-normal text-white text-base sm:text-xl sm:text-left lg:text-4xl">
                {this.state.train1[0]} {this.state.train1[1]}:  &nbsp;&nbsp;&nbsp;{this.state.train1[2]}
            </div>
            <div className="pl-5 font-light leading-normal text-white text-base sm:text-xl sm:text-left lg:text-4xl">
                {this.state.train2[0]} {this.state.train2[1]}:   &nbsp;&nbsp;&nbsp;{this.state.train2[2]}
            </div>
            <div className="pl-5 font-light leading-normal text-white text-base sm:text-xl sm:text-left lg:text-4xl">
                {this.state.train3[0]} {this.state.train3[1]}: &nbsp;&nbsp;&nbsp;{this.state.train3[2]}
            </div>
            <div className="pl-5 font-light leading-normal text-white text-base sm:text-xl sm:text-left lg:text-4xl">
                {this.state.train4[0]} {this.state.train4[1]}: &nbsp;&nbsp;&nbsp;{this.state.train4[2]}
            </div>
        </div>;
    }
}