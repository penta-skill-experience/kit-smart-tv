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

afterAll(() => {
    jest.restoreAllMocks();
});

describe("Tram Schedule Snapshots", () => {

    beforeEach(() => {
        fetchMock.mockResponse(
            JSON.stringify(
                {"timestamp":"2022-03-10 17:32:48","stopName":"Hauptfriedhof","departures":[{"route":"S2","destination":"Blankenloch","direction":"2","time":"3 min","lowfloor":false,"realtime":true,"traction":0},{"route":"3","destination":"Rintheim","direction":"2","time":"4 min","lowfloor":false,"realtime":true,"traction":0},{"route":"4","destination":"Waldstadt","direction":"2","time":"5 min","lowfloor":false,"realtime":true,"traction":0},{"route":"4","destination":"Oberreut","direction":"1","time":"6 min","lowfloor":false,"realtime":true,"traction":0},{"route":"3","destination":"Daxlanden über Hbf","direction":"1","time":"9 min","lowfloor":false,"realtime":true,"traction":0},{"route":"S2","destination":"Spöck","direction":"2","time":"17:45","lowfloor":false,"realtime":true,"traction":0},{"route":"3","destination":"Rintheim","direction":"2","time":"17:46","lowfloor":false,"realtime":true,"traction":0},{"route":"4","destination":"Waldstadt","direction":"2","time":"17:48","lowfloor":false,"realtime":true,"traction":0},{"route":"4","destination":"Oberreut","direction":"1","time":"17:49","lowfloor":false,"realtime":true,"traction":0},{"route":"S2","destination":"Rheinstetten","direction":"1","time":"17:50","lowfloor":false,"realtime":true,"traction":0}]}
            )
        );
    });

    test("Tram schedule testing with content", async () => {

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
});

describe("", () => {

    beforeEach(() => {
        fetchMock.mockResponse(
            JSON.stringify(
                {"timestamp":"2022-03-10 17:32:48","stopName":"Hauptfriedhof","departures":[{"route":"S2","destination":"Blankenloch","direction":"2","time":"3 min","lowfloor":false,"realtime":true,"traction":0},{"route":"3","destination":"Rintheim","direction":"2","time":"4 min","lowfloor":false,"realtime":true,"traction":0},{"route":"4","destination":"Waldstadt","direction":"2","time":"5 min","lowfloor":false,"realtime":true,"traction":0},{"route":"4","destination":"Oberreut","direction":"1","time":"6 min","lowfloor":false,"realtime":true,"traction":0},{"route":"3","destination":"Daxlanden über Hbf","direction":"1","time":"9 min","lowfloor":false,"realtime":true,"traction":0},{"route":"S2","destination":"Spöck","direction":"2","time":"17:45","lowfloor":false,"realtime":true,"traction":0},{"route":"3","destination":"Rintheim","direction":"2","time":"17:46","lowfloor":false,"realtime":true,"traction":0},{"route":"4","destination":"Waldstadt","direction":"2","time":"17:48","lowfloor":false,"realtime":true,"traction":0},{"route":"4","destination":"Oberreut","direction":"1","time":"17:49","lowfloor":false,"realtime":true,"traction":0},{"route":"S2","destination":"Rheinstetten","direction":"1","time":"17:50","lowfloor":false,"realtime":true,"traction":0}]}
            )
        ).mockResponseOnce(
            JSON.stringify(
                {"stops":[{"id":"HFR","name":"Hauptfriedhof","lat":49.013053,"lon":8.431125}]}
            )
        );
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
});
