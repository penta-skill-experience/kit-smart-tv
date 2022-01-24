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

    getWeather() {
        axios.get(WeatherConfig.URL + WeatherConfig.API_KEY)
            .then(resp => {
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
        return <div className="grid grid-col-3 grid-flow-col gap-3 box-border items-center sm:pt-4 xl:pt-12 2xl:pt-16 8xl:pt-20 h-fit">
                <img className="sm:w-8 md:w-10 lg:w-16 xl:w-20 4xl:w-28 8xl:w-40 sm:object-left sm:scale-150 lg:scale-150" src={WeatherConfig.URL_ICONS + this.state.icon + "@4x.png"} alt="logo"/>
                <div className="justify-center">
                    <div className="font-light leading-normal sm:text-base xl:text-xl 2xl:text-3xl 4xl:text-4xl 8xl:text-6xl">
                        {kelvinToCelsiusRounded(this.state.temp)}°
                    </div>
                    <div className="font-light leading-normal sm:text-xs xl:text-base 2xl:text-xl 4xl:text-2xl 8xl:text-3xl">
                        Karlsruhe
                    </div>
                </div>
                <div className="grid grid-rows-3 sm:gap-0 xl:gap-1">
                    <div className="font-light leading-normal sm:text-xs xl:text-base 2xl:text-xl 4xl:text-2xl 8xl:text-3xl sm:text-left">
                        precipitation: <span className="font-medium sm:text-sm xl:text-lg 2xl:text-2xl 4xl:text-3xl 8xl:text-5xl sm:text-left">{this.state.precipitation * 100}</span>%
                    </div>
                    <div className="font-light leading-normal sm:text-xs xl:text-base 2xl:text-xl 4xl:text-2xl 8xl:text-3xl sm:text-left">
                        humidity: <span className="font-medium sm:text-sm xl:text-lg 2xl:text-2xl 4xl:text-3xl 8xl:text-5xl sm:text-left">{this.state.humidity}</span>%
                    </div>
                    <div
                        className="font-light leading-normal sm:text-xs xl:text-base 2xl:text-xl 4xl:text-2xl 8xl:text-3xl sm:text-left">
                        wind: <span className="font-medium sm:text-sm xl:text-lg 2xl:text-2xl 4xl:text-3xl 8xl:text-5xl sm:text-left">{Math.round(this.state.windSpeed)}</span> km/h
                    </div>
                </div>
        </div>;
    }
}