import React from "react";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {configure, shallow} from "enzyme";
import toJson from "enzyme-to-json";
import * as MockDate from "mockdate";
import {TimeDisplayComponent} from "../../../../../client/widget_catalog/time/TimeDisplayComponent";


// This sets the mock adapter on the default instance
configure({adapter: new Adapter()});
describe("time Component Snapshots", () => {
    test("time component Snapshot time", async () => {
        MockDate.set(new Date(2022, 0O2, 0O3, 11, 23, 42, 11));
        jest.useFakeTimers('legacy');
        Promise.resolve().then(() => jest.advanceTimersByTime(15000));
        jest.runOnlyPendingTimers();
        const wrapper = shallow(<TimeDisplayComponent error={(msg => {})} specialBoldFontColor={"ForestGreen"} specialSubtleFontColor={"Tomato"} />);
        await new Promise(process.nextTick);
        expect(toJson(wrapper)).toMatchSnapshot();
        jest.useRealTimers();
    });
    afterAll(() => {
        MockDate.reset();
        jest.restoreAllMocks();
    });
});