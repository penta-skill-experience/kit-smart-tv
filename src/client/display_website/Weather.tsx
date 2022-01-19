import * as React from "react";
import axios from "axios";
import * as WeatherConfig from "./Weather.json";

let kelvinToCelsiusRounded = x => {
    return Math.round(x - WeatherConfig.KELVIN);
};

export class Weather extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
            temp: 0,
            humidity: 0,
            windSpeed: 0,
            precipitation: 0,
            icon: ""
        };
    }

    componentDidMount() {
        this.getWeather();
        setInterval(() => this.getWeather(), WeatherConfig.REFRESH_RATE);
    }

    async getWeather() {

        await axios.get(WeatherConfig.URL+WeatherConfig.API_KEY)
            .then(resp => {
                console.log(resp.data);
                console.log(resp.data.current.weather[0].icon);
                this.setState({
                    temp: resp.data.current.temp,
                    humidity: resp.data.current.humidity,
                    windSpeed: resp.data.current.wind_speed,
                    precipitation: resp.data.minutely[0].precipitation,
                    icon: resp.data.current.weather[0].icon
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return <div className="grid grid-col-3 grid-flow-col gap-3 box-border">
            <img src={WeatherConfig.URL_ICONS + this.state.icon +"@4x.png"} alt="logo" />
            <div className="grid grid-rows-3 gap-0">
                <div className="font-light leading-normal text-white text-base sm:text-8xl">
                    {kelvinToCelsiusRounded(this.state.temp)}°
                </div>
                <div className="font-light leading-normal text-white text-base sm:text-2xl">
                    Karlsruhe
                </div>
            </div>
            <div className="grid grid-rows-3 gap-0">
                <div className="pl-5 font-light leading-normal text-white text-base sm:text-xl sm:text-left lg:text-2xl">
                    precipitation: {this.state.precipitation * 100}%
                </div>
                <div className="pl-5 font-light leading-normal text-white text-base sm:text-xl sm:text-left lg:text-2xl">
                    humidity: {this.state.humidity}%
                </div>
                <div className="pl-5 font-light leading-normal text-white text-base sm:text-xl sm:text-left lg:text-2xl">
                wind: {Math.round(this.state.windSpeed)} km/h
                </div>
            </div>
            </div>;
    }
}