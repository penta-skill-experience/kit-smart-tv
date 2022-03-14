import * as React from "react";
import axios from "axios";
import * as WeatherConfig from "./Weather.json";
import {DisplayComponent} from "../../widget/DisplayComponent";

let kelvinToCelsiusRounded = x => {
    return Math.round(x - WeatherConfig.KELVIN);
};
let toKMH = x => {
    return Math.round(x * WeatherConfig.MPS);
};

export class WeatherDisplayComponent extends DisplayComponent<any> {

    constructor(props) {
        super(props);
        this.state = {
            temp: 0,
            humidity: 0,
            windSpeed: 0,
            precipitation: 0,
            icon: "",
            gotIcon: false,
        };
    }

    componentDidMount() {
        this.getWeather();
        setInterval(() => this.getWeather(), WeatherConfig.REFRESH_RATE);
    }

    getWeather() {
        axios.get(WeatherConfig.URL + WeatherConfig.API_KEY)
            .then(resp => this.setState({
                temp: Math.floor(resp.data.current.temp),
                humidity: Math.floor(resp.data.current.humidity),
                windSpeed: Math.floor(toKMH(resp.data.current.wind_speed)),
                precipitation: Math.floor(resp.data.hourly[0].pop * 100),
                icon: resp.data.current.weather[0].icon,
                gotIcon: true,
            }))
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (this.state.gotIcon ?
            <div className="grid grid-col-3 grid-flow-col gap-3 box-border items-center h-fit">
                <img
                    className="sm:w-8 md:w-10 lg:w-16 xl:w-20 4xl:w-28 8xl:w-40 sm:object-left sm:scale-150 lg:scale-150"
                    src={WeatherConfig.URL_ICONS + this.state.icon + WeatherConfig.URL_ICONS_POST}
                    alt="logo"/>
                <div className="justify-center">
                    <div
                        className="font-light leading-normal sm:text-lg xl:text-2xl 2xl:text-4xl 4xl:text-5xl 8xl:text-6xl">
                        {kelvinToCelsiusRounded(this.state.temp)}°
                    </div>
                    <div
                        className="font-light leading-normal sm:text-xs xl:text-base 2xl:text-xl 4xl:text-2xl 8xl:text-3xl">
                        Karlsruhe
                    </div>
                </div>
                <div className="grid grid-rows-3 sm:gap-0 xl:gap-1">
                    <div
                        className="font-light leading-normal sm:text-xs xl:text-base 2xl:text-xl 4xl:text-2xl 8xl:text-3xl sm:text-left">
                        Precipitation: <span
                        className="font-medium sm:text-xs xl:text-lg 2xl:text-2xl 4xl:text-3xl 8xl:text-5xl sm:text-left">{this.state.precipitation}</span>%
                    </div>
                    <div
                        className="font-light leading-normal sm:text-xs xl:text-base 2xl:text-xl 4xl:text-2xl 8xl:text-3xl sm:text-left">
                        Humidity: <span
                        className="font-medium sm:text-xs xl:text-lg 2xl:text-2xl 4xl:text-3xl 8xl:text-5xl sm:text-left">{this.state.humidity}</span>%
                    </div>
                    <div
                        className="font-light leading-normal sm:text-xs xl:text-base 2xl:text-xl 4xl:text-2xl 8xl:text-3xl sm:text-left">
                        Wind: <span
                        className="font-medium sm:text-xs xl:text-lg 2xl:text-2xl 4xl:text-3xl 8xl:text-5xl sm:text-left">{this.state.windSpeed}</span> km/h
                    </div>
                </div>
            </div> : <div/>);
    }
}