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
            <div className="pl-5 pt-5 font-light leading-normal text-white text-base sm:text-5xl sm:text-left lg:text-9xl">{this.state.time}</div>
            <div className="pl-5 pt-4 leading-normal text-white text-base sm:text-2xl sm:text-left lg:text-4xl">{weekday[this.state.day]},{this.state.date}</div>
        </div>
    }
}