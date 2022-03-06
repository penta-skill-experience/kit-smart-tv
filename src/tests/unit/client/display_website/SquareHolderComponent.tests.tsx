/**
 * @jest-environment jsdom
 */
import React from "react";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {configure, shallow} from "enzyme";
import toJson from "enzyme-to-json";
import {WidgetData} from "../../../../client/widget/WidgetData";
import {SquareHolder} from "../../../../client/display_website/SquareHolder";
import $ from 'jquery';
import {
    CafeteriaOpeningDisplayComponent
} from "../../../../client/widget_catalog/cafeteria_opening/CafeteriaOpeningDisplayComponent";

const widgetOne = new WidgetData("cafeteria-menu", 2, {});

//mocking display website persistence to return test values for these tests
//no prototype for static methods
const mathMock = jest.spyOn(Math, "random");
const documentMock = jest.spyOn(document, "getElementById");
const overflowing = document.createElement("overflowing");
const clientHeight = jest.spyOn(overflowing, "clientHeight", "get");
const scrollHeight = jest.spyOn(overflowing, "scrollHeight", "get");


configure({adapter: new Adapter()});

describe("Square Holder Snapshots", () => {
    beforeAll(() => {
        $.fx.off = true;
    });
    test("Square holder Snapshots with large overflow", async () => {
        mathMock.mockImplementation(() => {
            return 0.5;
        });
        documentMock.mockImplementation((id: string) => {
            return overflowing;
        });
        clientHeight.mockImplementation(() => {
            return 100;
        });
        scrollHeight.mockImplementation(() => {
            return 3000;
        });
        jest.useFakeTimers("legacy");
        Promise.resolve().then(() => jest.advanceTimersByTime(16000));
        jest.runOnlyPendingTimers();
        const wrapper = shallow(<SquareHolder displayComponentClass={CafeteriaOpeningDisplayComponent}
                                              rawConfig={""}
                                              title={widgetOne.widgetId}
                                              accentColor="black"
                                              titleColor="black"
                                              specialBoldFontColor="black"
                                              specialSubtleFontColor="black">
        </SquareHolder>);
        SquareHolder.getDerivedStateFromError(new Error);
        await new Promise(process.nextTick);
        expect(toJson(wrapper)).toMatchSnapshot();
        wrapper.unmount()
    });
    test("Square holder Snapshots with small overflow", async () => {
        mathMock.mockImplementation(() => {
            return 0.5;
        });
        documentMock.mockImplementation((id: string) => {
            return overflowing;
        });
        clientHeight.mockImplementation(() => {
            return 54;
        });
        scrollHeight.mockImplementation(() => {
            return 100;
        });
        jest.useFakeTimers("legacy");
        Promise.resolve().then(() => jest.advanceTimersByTime(16000));
        jest.runOnlyPendingTimers();
        const wrapper = shallow(<SquareHolder displayComponentClass={CafeteriaOpeningDisplayComponent}
                                              rawConfig={""}
                                              title={widgetOne.widgetId}
                                              accentColor="black"
                                              titleColor="black"
                                              specialBoldFontColor="black"
                                              specialSubtleFontColor="black">
        </SquareHolder>);
        SquareHolder.getDerivedStateFromError(new Error);
        await new Promise(process.nextTick);
        expect(toJson(wrapper)).toMatchSnapshot();
        wrapper.unmount()
    });
    test("Square holder Snapshots with no element", async () => {
        documentMock.mockImplementation((id: string) => {
            return null;
        });
        jest.useFakeTimers("legacy");
        Promise.resolve().then(() => jest.advanceTimersByTime(16000));
        jest.runOnlyPendingTimers();
        const wrapper = shallow(<SquareHolder displayComponentClass={CafeteriaOpeningDisplayComponent}
                                              rawConfig={""}
                                              title={widgetOne.widgetId}
                                              accentColor="black"
                                              titleColor="black"
                                              specialBoldFontColor="black"
                                              specialSubtleFontColor="black">
        </SquareHolder>);
        await new Promise(process.nextTick);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    test("Square holder Snapshots with error", async () => {
        documentMock.mockImplementation((id: string) => {
            return null;
        });
        jest.useFakeTimers("legacy");
        Promise.resolve().then(() => jest.advanceTimersByTime(16000));
        jest.runOnlyPendingTimers();
        const wrapper = shallow(<SquareHolder displayComponentClass={CafeteriaOpeningDisplayComponent}
                                              rawConfig={""}
                                              title={widgetOne.widgetId}
                                              accentColor="black"
                                              titleColor="black"
                                              specialBoldFontColor="black"
                                              specialSubtleFontColor="black">
        </SquareHolder>);
        wrapper.setState({hasError: true});
        await new Promise(process.nextTick);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    afterEach(() => {
        jest.useRealTimers();
        jest.clearAllMocks();
    });
    afterAll(() => {
        $.fx.off = true;
    });
});