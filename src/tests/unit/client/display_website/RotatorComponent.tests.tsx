import React from "react";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {configure, shallow} from "enzyme";
import toJson from "enzyme-to-json";
import {RotatorComponent} from "../../../../client/display_website/RotatorComponent";
import {WidgetData} from "../../../../client/widget/WidgetData";
import {SquareHolder} from "../../../../client/display_website/SquareHolder";
import {
    CafeteriaMenuDisplayComponent
} from "../../../../client/widget_catalog/cafeteria_menu/CafeteriaMenuDisplayComponent";
import {
    CafeteriaOpeningDisplayComponent
} from "../../../../client/widget_catalog/cafeteria_opening/CafeteriaOpeningDisplayComponent";

configure({adapter: new Adapter()});

const widgetOne = new WidgetData("cafeteria-menu", 2, {});
const widgetTwo = new WidgetData("cafeteria-opening", 2, {});

describe("rotatorComponent Snapshots", () => {

    test("rotatorComponent Snapshots without children", async () => {
        jest.useFakeTimers('legacy');
        Promise.resolve().then(() => jest.advanceTimersByTime(15000));
        jest.runOnlyPendingTimers();
        const wrapper = shallow(<RotatorComponent/>);
        await new Promise(process.nextTick);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    test("rotatorComponent with children", async () => {
        jest.useFakeTimers('legacy');
        Promise.resolve().then(() => jest.advanceTimersByTime(15000));
        jest.runOnlyPendingTimers();
        const wrapper = shallow(<RotatorComponent>
            <SquareHolder displayComponentClass={CafeteriaMenuDisplayComponent}
                              rawConfig={widgetOne.rawConfig}
                              title={widgetOne.widgetId}
                              accentColor="black"
                              titleColor="black"
                              specialBoldFontColor="black"
                              specialSubtleFontColor="black">
             </SquareHolder>
             <SquareHolder displayComponentClass={CafeteriaOpeningDisplayComponent}
                          rawConfig={""}
                          title={widgetTwo.widgetId}
                          accentColor="black"
                          titleColor="black"
                          specialBoldFontColor="black"
                          specialSubtleFontColor="black">
            </SquareHolder>
            </RotatorComponent>
            );
        await new Promise(process.nextTick);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    afterEach(() => {
        jest.useRealTimers();
    });
    afterAll(() => {
        jest.restoreAllMocks();
    });
});