/**
 * @jest-environment jsdom
 */
import fetchMock from "jest-fetch-mock";
import React from "react";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {configure, shallow} from "enzyme";
import toJson from "enzyme-to-json";
import {
    TramScheduleDisplayComponent
} from "../../../../../client/widget_catalog/tram_schedule/TramScheduleDisplayComponent";
import * as TramScheduleConfig from "../../../../../client/widget_catalog/tram_schedule/TramSchedule.json";
import {
    TramScheduleConfigComponent
} from "../../../../../client/widget_catalog/tram_schedule/TramScheduleConfigComponent";

fetchMock.enableMocks();


global.Headers = class {
    constructor() {};
    append(var1 : string, var2 : string) {};
} as jest.Mock;
configure({adapter: new Adapter()});
beforeEach(() => {
});
describe("Tram Schedule Snapshots", () => {
    test("Tram schedule testing with content", async () => {
        fetchMock.mockResponseOnce(
            JSON.stringify(
                {"stops":[{"id":"AMHE","name":"Durlach Am Heegwald","lat":49.017724,"lon":8.478317},{"id":"DBFW","name":"Durlach Bahnhof","lat":49.002545,"lon":8.462076},{"id":"BRT","name":"Durlach Breit","lat":49.020788,"lon":8.477926},{"id":"DUF","name":"Durlach Friedhof","lat":49.002304,"lon":8.482893},{"id":"RKDUH","name":"Durlach Hubstraße","lat":49.007152,"lon":8.472184},{"id":"GDS","name":"Durlacher Straße","lat":49.010921,"lon":8.49006},{"id":"DTO","name":"Durlacher Tor/K I T","lat":49.009133,"lon":8.414049},{"id":"DTU","name":"Durlacher Tor/K I T (U)","lat":0.0,"lon":0.0},{"id":"RKDU","name":"Karlsruhe-Durlach","lat":49.001388,"lon":8.462353},{"id":"WOEDA","name":"Wöss. Durlacher Allee","lat":49.015171,"lon":8.602625}]}
            )
        ).mockResponseOnce(
            JSON.stringify(
                {"timestamp":"2022-03-06 16:18:32","stopName":"Durlacher Tor/K I T","departures":[{"route":"4","destination":"Waldstadt","direction":"2","time":"6 min","lowfloor":false,"realtime":true,"traction":0},{"route":"3","destination":"Rappenwört über Hbf","direction":"1","time":"7 min","lowfloor":false,"realtime":true,"traction":0},{"route":"30","destination":"Elbinger Straße","direction":"2","time":"16:30","lowfloor":true,"realtime":true,"traction":0},{"route":"3","destination":"Rintheim","direction":"2","time":"16:31","lowfloor":false,"realtime":true,"traction":0},{"route":"4","destination":"Oberreut","direction":"1","time":"16:32","lowfloor":false,"realtime":true,"traction":0},{"route":"4","destination":"Waldstadt","direction":"2","time":"16:45","lowfloor":false,"realtime":true,"traction":0},{"route":"3","destination":"Rappenwört über Hbf","direction":"1","time":"16:46","lowfloor":false,"realtime":true,"traction":0},{"route":"3","destination":"Rintheim","direction":"2","time":"16:51","lowfloor":false,"realtime":true,"traction":0},{"route":"4","destination":"Oberreut","direction":"1","time":"16:52","lowfloor":false,"realtime":true,"traction":0},{"route":"4","destination":"Waldstadt","direction":"2","time":"17:05","lowfloor":false,"realtime":true,"traction":0}]}            )
        );
        const configuration = {
            stop: TramScheduleConfig.DEFAULT_STOP_ID,
            count: TramScheduleConfig.DEFAULT_ITEM_COUNT,
        };
        const wrapper = shallow(<TramScheduleDisplayComponent error={(msg => {})} config={configuration} specialBoldFontColor={"ForestGreen"} specialSubtleFontColor={"DarkOrange"}/>);
        await new Promise(process.nextTick);
        expect(toJson(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });
    test("Tram schedule testing without content", async () => {
        const configuration = {
            stop: TramScheduleConfig.DEFAULT_STOP_ID,
            count: TramScheduleConfig.DEFAULT_ITEM_COUNT,
        };
        const wrapper = shallow(<TramScheduleDisplayComponent error={(msg => {})} config={configuration} specialBoldFontColor={"ForestGreen"} specialSubtleFontColor={"DarkOrange"}/>);
        await new Promise(process.nextTick);
        expect(toJson(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });
    test("Tram schedule config without content", async () => {
        const configuration = {
            stop: TramScheduleConfig.DEFAULT_STOP_ID,
            count: TramScheduleConfig.DEFAULT_ITEM_COUNT,
        };
        const wrapper = shallow(<TramScheduleConfigComponent config={configuration}/>);
        await new Promise(process.nextTick);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    afterAll(() => {
        jest.restoreAllMocks();
    });
});
