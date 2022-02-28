import React from "react";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {shallow, configure} from "enzyme";
import toJson from "enzyme-to-json";
import {DesignConfigValues, DesignUtility} from "../../../../shared/persistence/DesignUtility";
import {WidgetPersistence} from "../../../../shared/persistence/WidgetPersistence";
import {WidgetLoader} from "../../../../client/widget/WidgetLoader";
import {RootComponent} from "../../../../client/display_website/RootComponent";
import {ColorScheme} from "../../../../shared/values/ColorScheme";
import {FontSize} from "../../../../shared/values/FontSize";
import {WidgetData} from "../../../../client/widget/WidgetData";
import {RssFeedWidget} from "../../../../client/widget_catalog/rss_feed/RssFeedWidget";
import {CafeteriaMenuWidget} from "../../../../client/widget_catalog/cafeteria_menu/CafeteriaMenuWidget";

const colorScheme: ColorScheme = {
    id: "dark",
    name: "dark",
    titleFontColor: "black",
    bodyFontColor: "black",
    specialBoldFontColor: "red",
    specialSubtleFontColor: "green",
    accentBarColor: "black",
    backgrounds: ["https://cdn.pixabay.com/photo/2020/04/08/06/55/elephant-5015964_1280.jpg"],
};
const fontSize: FontSize =  {
        id: "medium",
        name: "medium",
        relativeSize: 1,
    };
const values: DesignConfigValues = {
    fontSize: fontSize,
    colorScheme: colorScheme,
    background: colorScheme.backgrounds[0],
};
const widgetOne = new WidgetData("cafeteria-menu", 2, {});
const widgetTwo = new WidgetData("cafeteria-opening", 2, {});
const widgetDataList = [widgetOne, widgetTwo];

//mocking display website persistence to return test values for these tests
//no prototype for static methods
const getDesignConfigValuesMock = jest.spyOn(DesignUtility, "getDesignConfigValues");
const getWidgetDataListMock = jest.spyOn(WidgetPersistence.prototype, "getWidgetDataList");
const getWidgetMock = jest.spyOn(WidgetLoader.prototype, "getWidget");

configure({adapter: new Adapter()});

describe("rootComponent Snapshots", () => {

    test("rootComponent Snapshots with design values and widget info", async () => {
        getDesignConfigValuesMock.mockImplementation(() => {
            return new Promise<DesignConfigValues>(resolve => {
                resolve(values);
            });
        });
        getWidgetDataListMock.mockImplementation(() => {
            return new Promise<WidgetData[]>(resolve => {
                resolve(widgetDataList);
            });
        });
        getWidgetMock.mockImplementation((widgetId: string) => {
            if(widgetId == "cafeteria-menu") {
                return new CafeteriaMenuWidget();
            } else {
                return new RssFeedWidget();
            }
        });
        const wrapper = shallow(<RootComponent/>);
        await new Promise(process.nextTick);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
});