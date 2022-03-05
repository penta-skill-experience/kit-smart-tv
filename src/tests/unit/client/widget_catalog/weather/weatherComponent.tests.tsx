import React from "react";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {configure, shallow} from "enzyme";
import toJson from "enzyme-to-json";
import * as WeatherConfig from "../../../../../client/widget_catalog/weather/Weather.json";
import {WeatherDisplayComponent} from "../../../../../client/widget_catalog/weather/WeatherDisplayComponent";
import {WeatherWidget} from "../../../../../client/widget_catalog/weather/WeatherWidget";

const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);
configure({adapter: new Adapter()});

describe("Weather widget Snapshots", () => {
    test("Weather widget test", async () => {
        mock.onGet(WeatherConfig.URL + WeatherConfig.API_KEY).reply(200,
        JSON.stringify({"lat":49.0047,"lon":8.3858,"timezone":"Europe/Berlin","timezone_offset":3600,"current":{"dt":1646356849,"sunrise":1646373793,"sunset":1646414012,"temp":274.28,"feels_like":271.54,"pressure":1019,"humidity":71,"dew_point":270.02,"uvi":0,"clouds":0,"visibility":10000,"wind_speed":2.43,"wind_deg":59,"wind_gust":5.41,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}]},"hourly":[{"dt":1646355600,"temp":274.28,"feels_like":271.54,"pressure":1019,"humidity":71,"dew_point":270.02,"uvi":0,"clouds":0,"visibility":10000,"wind_speed":2.43,"wind_deg":59,"wind_gust":5.41,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"pop":0},{"dt":1646359200,"temp":274.11,"feels_like":271.26,"pressure":1019,"humidity":72,"dew_point":270.04,"uvi":0,"clouds":0,"visibility":10000,"wind_speed":2.5,"wind_deg":53,"wind_gust":5.48,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"pop":0},{"dt":1646362800,"temp":273.82,"feels_like":270.84,"pressure":1019,"humidity":72,"dew_point":269.79,"uvi":0,"clouds":0,"visibility":10000,"wind_speed":2.58,"wind_deg":55,"wind_gust":5.69,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"pop":0},{"dt":1646366400,"temp":273.57,"feels_like":270.49,"pressure":1019,"humidity":73,"dew_point":269.74,"uvi":0,"clouds":1,"visibility":10000,"wind_speed":2.64,"wind_deg":53,"wind_gust":5.79,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"pop":0},{"dt":1646370000,"temp":273.25,"feels_like":270.04,"pressure":1019,"humidity":72,"dew_point":269.31,"uvi":0,"clouds":0,"visibility":10000,"wind_speed":2.71,"wind_deg":53,"wind_gust":5.79,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"pop":0},{"dt":1646373600,"temp":272.88,"feels_like":269.48,"pressure":1019,"humidity":70,"dew_point":267.95,"uvi":0,"clouds":0,"visibility":10000,"wind_speed":2.83,"wind_deg":54,"wind_gust":6.29,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"pop":0},{"dt":1646377200,"temp":273.78,"feels_like":270.42,"pressure":1020,"humidity":65,"dew_point":267.8,"uvi":0.2,"clouds":0,"visibility":10000,"wind_speed":2.99,"wind_deg":55,"wind_gust":7.23,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"pop":0},{"dt":1646380800,"temp":276.09,"feels_like":272.81,"pressure":1021,"humidity":55,"dew_point":267.63,"uvi":0.62,"clouds":0,"visibility":10000,"wind_speed":3.5,"wind_deg":62,"wind_gust":6.78,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"pop":0},{"dt":1646384400,"temp":278.11,"feels_like":274.99,"pressure":1021,"humidity":46,"dew_point":267.28,"uvi":1.22,"clouds":0,"visibility":10000,"wind_speed":3.95,"wind_deg":67,"wind_gust":6.62,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"pop":0},{"dt":1646388000,"temp":279.64,"feels_like":276.77,"pressure":1020,"humidity":41,"dew_point":267.21,"uvi":1.87,"clouds":0,"visibility":10000,"wind_speed":4.14,"wind_deg":68,"wind_gust":6.17,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"pop":0},{"dt":1646391600,"temp":280.79,"feels_like":278.29,"pressure":1020,"humidity":37,"dew_point":267.05,"uvi":2.27,"clouds":0,"visibility":10000,"wind_speed":3.93,"wind_deg":68,"wind_gust":5.42,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"pop":0},{"dt":1646395200,"temp":281.69,"feels_like":279.45,"pressure":1019,"humidity":35,"dew_point":266.81,"uvi":2.26,"clouds":0,"visibility":10000,"wind_speed":3.81,"wind_deg":66,"wind_gust":5.18,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"pop":0},{"dt":1646398800,"temp":282.24,"feels_like":280.16,"pressure":1019,"humidity":33,"dew_point":266.64,"uvi":1.83,"clouds":0,"visibility":10000,"wind_speed":3.74,"wind_deg":62,"wind_gust":5.03,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"pop":0},{"dt":1646402400,"temp":282.3,"feels_like":280.13,"pressure":1019,"humidity":33,"dew_point":266.75,"uvi":1.19,"clouds":0,"visibility":10000,"wind_speed":3.96,"wind_deg":58,"wind_gust":5.08,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"pop":0},{"dt":1646406000,"temp":281.91,"feels_like":279.68,"pressure":1018,"humidity":36,"dew_point":267.51,"uvi":0.6,"clouds":0,"visibility":10000,"wind_speed":3.9,"wind_deg":56,"wind_gust":4.92,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"pop":0},{"dt":1646409600,"temp":280.73,"feels_like":278.4,"pressure":1018,"humidity":42,"dew_point":268.57,"uvi":0.19,"clouds":0,"visibility":10000,"wind_speed":3.58,"wind_deg":55,"wind_gust":6.3,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"pop":0},{"dt":1646413200,"temp":278.17,"feels_like":275.74,"pressure":1019,"humidity":52,"dew_point":268.92,"uvi":0,"clouds":0,"visibility":10000,"wind_speed":2.92,"wind_deg":58,"wind_gust":6.98,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"pop":0},{"dt":1646416800,"temp":276.54,"feels_like":274.05,"pressure":1019,"humidity":59,"dew_point":269.03,"uvi":0,"clouds":0,"visibility":10000,"wind_speed":2.6,"wind_deg":67,"wind_gust":7.01,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"pop":0},{"dt":1646420400,"temp":275.7,"feels_like":273.53,"pressure":1020,"humidity":64,"dew_point":269.26,"uvi":0,"clouds":0,"visibility":10000,"wind_speed":2.12,"wind_deg":75,"wind_gust":3.9,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"pop":0},{"dt":1646424000,"temp":275.06,"feels_like":273.07,"pressure":1020,"humidity":67,"dew_point":269.27,"uvi":0,"clouds":0,"visibility":10000,"wind_speed":1.87,"wind_deg":78,"wind_gust":2.67,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"pop":0},{"dt":1646427600,"temp":274.54,"feels_like":272.43,"pressure":1020,"humidity":69,"dew_point":269.19,"uvi":0,"clouds":0,"visibility":10000,"wind_speed":1.9,"wind_deg":76,"wind_gust":3.14,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"pop":0},{"dt":1646431200,"temp":274.03,"feels_like":271.53,"pressure":1020,"humidity":71,"dew_point":269.19,"uvi":0,"clouds":0,"visibility":10000,"wind_speed":2.16,"wind_deg":70,"wind_gust":4.58,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"pop":0},{"dt":1646434800,"temp":273.48,"feels_like":270.9,"pressure":1020,"humidity":74,"dew_point":269.17,"uvi":0,"clouds":0,"visibility":10000,"wind_speed":2.15,"wind_deg":66,"wind_gust":4.66,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"pop":0},{"dt":1646438400,"temp":273.07,"feels_like":270.54,"pressure":1020,"humidity":77,"dew_point":269.2,"uvi":0,"clouds":0,"visibility":10000,"wind_speed":2.05,"wind_deg":64,"wind_gust":4.21,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"pop":0},{"dt":1646442000,"temp":272.79,"feels_like":270.29,"pressure":1020,"humidity":78,"dew_point":269.15,"uvi":0,"clouds":2,"visibility":10000,"wind_speed":1.99,"wind_deg":57,"wind_gust":3.81,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"pop":0},{"dt":1646445600,"temp":272.69,"feels_like":269.89,"pressure":1020,"humidity":78,"dew_point":269.12,"uvi":0,"clouds":2,"visibility":10000,"wind_speed":2.22,"wind_deg":52,"wind_gust":3.93,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"pop":0},{"dt":1646449200,"temp":272.55,"feels_like":269.67,"pressure":1020,"humidity":78,"dew_point":268.97,"uvi":0,"clouds":3,"visibility":10000,"wind_speed":2.27,"wind_deg":50,"wind_gust":4.23,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"pop":0},{"dt":1646452800,"temp":272.45,"feels_like":269.54,"pressure":1020,"humidity":78,"dew_point":268.92,"uvi":0,"clouds":3,"visibility":10000,"wind_speed":2.28,"wind_deg":49,"wind_gust":4.47,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"pop":0},{"dt":1646456400,"temp":272.36,"feels_like":269.42,"pressure":1020,"humidity":79,"dew_point":268.9,"uvi":0,"clouds":4,"visibility":10000,"wind_speed":2.29,"wind_deg":48,"wind_gust":4.41,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"pop":0},{"dt":1646460000,"temp":272.27,"feels_like":269.18,"pressure":1020,"humidity":80,"dew_point":268.95,"uvi":0,"clouds":4,"visibility":10000,"wind_speed":2.41,"wind_deg":52,"wind_gust":4.99,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"pop":0},{"dt":1646463600,"temp":273.24,"feels_like":270.22,"pressure":1021,"humidity":75,"dew_point":269.13,"uvi":0.2,"clouds":4,"visibility":10000,"wind_speed":2.51,"wind_deg":54,"wind_gust":5.78,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"pop":0},{"dt":1646467200,"temp":275.53,"feels_like":272.33,"pressure":1021,"humidity":63,"dew_point":269.07,"uvi":0.62,"clouds":4,"visibility":10000,"wind_speed":3.22,"wind_deg":64,"wind_gust":5.67,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"pop":0},{"dt":1646470800,"temp":277.58,"feels_like":274.63,"pressure":1021,"humidity":54,"dew_point":269.01,"uvi":1.2,"clouds":3,"visibility":10000,"wind_speed":3.48,"wind_deg":70,"wind_gust":5.53,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"pop":0},{"dt":1646474400,"temp":279.05,"feels_like":276.23,"pressure":1021,"humidity":49,"dew_point":268.95,"uvi":1.74,"clouds":2,"visibility":10000,"wind_speed":3.8,"wind_deg":71,"wind_gust":5.32,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"pop":0},{"dt":1646478000,"temp":280.07,"feels_like":277.39,"pressure":1020,"humidity":45,"dew_point":268.78,"uvi":2.1,"clouds":3,"visibility":10000,"wind_speed":3.95,"wind_deg":71,"wind_gust":5.23,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"pop":0},{"dt":1646481600,"temp":280.8,"feels_like":278.4,"pressure":1020,"humidity":42,"dew_point":268.52,"uvi":2.08,"clouds":3,"visibility":10000,"wind_speed":3.75,"wind_deg":72,"wind_gust":4.89,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"pop":0},{"dt":1646485200,"temp":281.34,"feels_like":279.19,"pressure":1019,"humidity":40,"dew_point":268.27,"uvi":1.69,"clouds":6,"visibility":10000,"wind_speed":3.5,"wind_deg":68,"wind_gust":4.69,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"pop":0},{"dt":1646488800,"temp":281.54,"feels_like":279.34,"pressure":1019,"humidity":39,"dew_point":268.2,"uvi":1.11,"clouds":6,"visibility":10000,"wind_speed":3.68,"wind_deg":61,"wind_gust":4.68,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"pop":0},{"dt":1646492400,"temp":281.24,"feels_like":278.84,"pressure":1019,"humidity":40,"dew_point":268.44,"uvi":0.57,"clouds":6,"visibility":10000,"wind_speed":3.93,"wind_deg":59,"wind_gust":4.89,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"pop":0},{"dt":1646496000,"temp":280.27,"feels_like":277.81,"pressure":1019,"humidity":47,"dew_point":269.46,"uvi":0.19,"clouds":6,"visibility":10000,"wind_speed":3.64,"wind_deg":51,"wind_gust":6.1,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"pop":0},{"dt":1646499600,"temp":277.75,"feels_like":275.11,"pressure":1019,"humidity":56,"dew_point":269.57,"uvi":0,"clouds":6,"visibility":10000,"wind_speed":3.09,"wind_deg":48,"wind_gust":7.31,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"pop":0},{"dt":1646503200,"temp":276.02,"feels_like":273.32,"pressure":1020,"humidity":63,"dew_point":269.5,"uvi":0,"clouds":6,"visibility":10000,"wind_speed":2.73,"wind_deg":56,"wind_gust":7.47,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"pop":0},{"dt":1646506800,"temp":275.14,"feels_like":272.78,"pressure":1020,"humidity":67,"dew_point":269.4,"uvi":0,"clouds":5,"visibility":10000,"wind_speed":2.21,"wind_deg":69,"wind_gust":4.93,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"pop":0},{"dt":1646510400,"temp":274.48,"feels_like":272.5,"pressure":1021,"humidity":69,"dew_point":269.15,"uvi":0,"clouds":6,"visibility":10000,"wind_speed":1.79,"wind_deg":80,"wind_gust":2.69,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"pop":0},{"dt":1646514000,"temp":273.98,"feels_like":272.01,"pressure":1021,"humidity":70,"dew_point":268.95,"uvi":0,"clouds":6,"visibility":10000,"wind_speed":1.73,"wind_deg":77,"wind_gust":2.37,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"pop":0},{"dt":1646517600,"temp":273.63,"feels_like":271.65,"pressure":1021,"humidity":71,"dew_point":268.72,"uvi":0,"clouds":5,"visibility":10000,"wind_speed":1.7,"wind_deg":67,"wind_gust":2.47,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"pop":0},{"dt":1646521200,"temp":273.31,"feels_like":271.21,"pressure":1021,"humidity":71,"dew_point":268.53,"uvi":0,"clouds":5,"visibility":10000,"wind_speed":1.75,"wind_deg":66,"wind_gust":2.78,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"pop":0},{"dt":1646524800,"temp":273,"feels_like":270.79,"pressure":1021,"humidity":72,"dew_point":268.34,"uvi":0,"clouds":4,"visibility":10000,"wind_speed":1.79,"wind_deg":67,"wind_gust":2.66,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"pop":0}],"alerts":[{"sender_name":"Deutscher Wetterdienst","event":"frost","start":1646334000,"end":1646380800,"description":"There is a risk of frost (Level 1 of 2).\nMinimum temperature: -1 - -4 °C; local minimum: in valleys and dips \u003e -6 °C","tags":["Extreme temperature value"]}]}));
        const wrapper = shallow(<WeatherDisplayComponent error={(msg => {})} specialBoldFontColor={"ForestGreen"} specialSubtleFontColor={"DarkOrange"} />);
        jest.useFakeTimers("legacy");
        Promise.resolve().then(() => jest.advanceTimersByTime(16000));
        jest.runOnlyPendingTimers();
        await new Promise(process.nextTick);
        expect(toJson(wrapper)).toMatchSnapshot();
        let filler = new WeatherWidget();
        expect(filler.getTitle()).toBe("Weather");
        expect(filler.isConfigurable()).toBe(false);
        expect(filler.getDisplayComponentClass()).toBe(WeatherDisplayComponent);
        expect(filler.getDefaultRawConfig()).toBe(undefined);
        expect(filler.getConfigComponentClass()).toBe(undefined);
    });
    afterEach(() => {
        jest.useRealTimers();
    });
    afterAll(() => {
        jest.restoreAllMocks();
    });
});