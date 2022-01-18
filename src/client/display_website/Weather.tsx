import * as React from "react";
import axios from "axios";
import * as WeatherConfig from "./Weather.json";

export class Weather extends React.Component<any, any> {

    static readonly REFRESH_RATE = 10_000;
    static readonly
    constructor(props) {
        super(props);
        this.state = {
            temp: 0,
            humidity: 0,
            windSpeed: 0,
            precipitation: 0
        };
    }

    componentDidMount() {
        this.getWeather();
        setInterval(() => this.getWeather(), Weather.REFRESH_RATE);
    }

    async getWeather() {
        await axios.get(WeatherConfig.URL+WeatherConfig.API_KEY)
            .then(resp => {
                this.setState({
                    temp: resp.data.main.temp,
                    humidity: resp.data.main.humidity,
                    windSpeed: resp.data.wind.speed,
                    precipitation: resp.data.main.temp,
                    main: resp.data.main.temp
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return <div className="pl-5 pt-5 font-light leading-normal text-white text-base sm:text-5xl sm:text-left lg:text-9xl">
            {this.state.temp}
        </div>
    }
}