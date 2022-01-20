import * as React from "react";
import * as TramScheduleConfig from "./TramSchedule.json";
import axios from "axios"

export class TramSchedule extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
            temp: ""
        };
    }
    async getSchedule() {
        await axios.get("https://cors-anywhere.herokuapp.com/" + TramScheduleConfig.URL, {
            headers: {
                'origin': 'www.example.com'
            }
        })
            .then(resp => {
                console.log(resp.data);
                this.setState({
                    temp: resp.data
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
        return <div className="grid grid-col-3 grid-flow-col gap-3 box-border">
        </div>;
    }
}