import * as React from "react";
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
export class DigitalTime extends React.Component<any, any> {
    private intervalID: NodeJS.Timer;
    constructor(props) {
        super(props);
        this.state = {
            time: new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})
                .replace(/(:\d{2}| [AP]M)$/, ""),
            date: new Date().toLocaleDateString(navigator.language, {day: 'numeric', month:'long'}),
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
            time: new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}),
            date: new Date().toLocaleDateString(navigator.language, {day: 'numeric', month:'long'}),
            day: new Date().getDay()


        });
    }
    render() {
        return <div className="flex-col">
            <div className="font-light text-white sm:text-2xl md:text-4xl lg:text-6xl xl:text-7xl 2xl:text-8xl 4xl:text-9xl 8xl:text-10xl sm:text-left">{this.state.time}</div
            ><div className="text-white sm:text-xs md:text-sm lg:text-base lg:text-xl 2xl:text-2xl 4xl:text-4xl 8xl:text-5xl sm:text-left sm:-mt-1 md:-mt-2 lg:-mt-3 xl:-mt-5 2xl:-mt-6 4xl:-mt-8 8xl:-mt-10">{weekday[this.state.day]}, {this.state.date}</div>
        </div>
    }
}