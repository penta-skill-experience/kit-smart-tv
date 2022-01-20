import * as React from "react";
import * as TramScheduleConfig from "./TramSchedule.json";
import fetchJsonp = require("fetch-jsonp");

fetchJsonp(TramScheduleConfig.URL, {
    jsonpCallback:'callback'
})
    .then(resp => {
        return resp;
    }).catch(ex => {
    console.log('parsing failed', ex)
});

export class TramSchedule extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
            temp: ""
        };
    }

    componentDidMount() {
        fetchJsonp(TramScheduleConfig.URL);
        setInterval(() => fetchJsonp(TramScheduleConfig.URL), TramScheduleConfig.REFRESH_RATE);
    }

    render() {
        return <div className="grid grid-col-3 grid-flow-col gap-3 box-border">
        </div>;
    }
}