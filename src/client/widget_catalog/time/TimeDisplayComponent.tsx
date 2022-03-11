import * as React from "react";
import {DisplayComponent} from "../../widget/DisplayComponent";

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export class TimeDisplayComponent extends DisplayComponent<any> {

    private intervalID: NodeJS.Timer;

    constructor(props) {
        super(props);
        this.state = {
            time: this.getTimeString(),
            date: this.getDateString(),
            day: new Date().getDay()
        };
    }

    componentDidMount() {
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    tick() {
        this.setState({
            time: this.getTimeString(),
            date: this.getDateString(),
            day: new Date().getDay()
        });
    }

    render() {
        return <div className="flex-col">
            <div
                className="font-light sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl 2xl:text-8xl 8xl:text-10xl sm:text-left sm:-mt-1 md:-mt-2 lg:-mt-3 xl:-mt-5 2xl:-mt-6 4xl:-mt-8 8xl:-mt-12">{this.state.time}</div
            >
            <div
                className="sm:text-xs md:text-sm lg:text-base lg:text-xl 2xl:text-2xl 4xl:text-4xl 8xl:text-5xl sm:text-left sm:-mt-1 md:-mt-2 lg:-mt-3 xl:-mt-5 2xl:-mt-6 4xl:-mt-8 8xl:-mt-12">{weekday[this.state.day]}, {this.state.date}</div>
        </div>
    }

    private getTimeString() {
        return new Date().toLocaleTimeString("de", {hour: '2-digit', minute: '2-digit'});
    }

    private getDateString() {
        return new Date().toLocaleDateString("en", {day: 'numeric', month: 'long'});
    }
}