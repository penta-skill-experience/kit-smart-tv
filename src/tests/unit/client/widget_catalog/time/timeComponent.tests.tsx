import React from "react";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {configure, shallow} from "enzyme";
import toJson from "enzyme-to-json";
import * as MockDate from "mockdate";
import {TimeDisplayComponent} from "../../../../../client/widget_catalog/time/TimeDisplayComponent";
import {CafeteriaOpeningWidget} from "../../../../../client/widget_catalog/cafeteria_opening/CafeteriaOpeningWidget";
import {
    CafeteriaOpeningDisplayComponent
} from "../../../../../client/widget_catalog/cafeteria_opening/CafeteriaOpeningDisplayComponent";
import {TimeWidget} from "../../../../../client/widget_catalog/time/TimeWidget";


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
        let filler = new TimeWidget();
        expect(filler.getTitle()).toBe("Time");
        expect(filler.isConfigurable()).toBe(false);
        expect(filler.getDisplayComponentClass()).toBe(TimeDisplayComponent);
        expect(filler.getDefaultRawConfig()).toBe(undefined);
        expect(filler.getConfigComponentClass()).toBe(undefined);
    });
    afterAll(() => {
        MockDate.reset();
        jest.restoreAllMocks();
    });
});