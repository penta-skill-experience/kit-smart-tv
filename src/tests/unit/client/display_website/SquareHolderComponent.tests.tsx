/**
 * @jest-environment jsdom
 */
import React from "react";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {configure, shallow} from "enzyme";
import toJson from "enzyme-to-json";
import {WidgetData} from "../../../../client/widget/WidgetData";
import {SquareHolder} from "../../../../client/display_website/SquareHolder";
import {
    CafeteriaOpeningDisplayComponent
} from "../../../../client/widget_catalog/cafeteria_opening/CafeteriaOpeningDisplayComponent";

const widgetOne = new WidgetData("cafeteria-menu", 2, {});

//mocking display website persistence to return test values for these tests
//no prototype for static methods
const mathMock = jest.spyOn(Math, "random");

configure({adapter: new Adapter()});

describe("Square Holder Snapshots", () => {

    test("Square holder Snapshots with design values and widget info", async () => {

        mathMock.mockImplementation(() => {
            return 0.5;
        });
        const wrapper = shallow(<SquareHolder displayComponentClass={CafeteriaOpeningDisplayComponent}
                                              rawConfig={""}
                                              title={widgetOne.widgetId}
                                              accentColor="black"
                                              titleColor="black"
                                              specialBoldFontColor="black"
                                              specialSubtleFontColor="black">
        </SquareHolder>);

        jest.useFakeTimers("legacy");
        await new Promise(process.nextTick);
        jest.runAllTimers();
        await new Promise(process.nextTick);
        expect(toJson(wrapper)).toMatchSnapshot();

    });

    afterEach(() => {
        jest.useRealTimers();
        jest.restoreAllMocks();
    });
});