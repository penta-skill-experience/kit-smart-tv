/**
 * @jest-environment jsdom
 */
import React from "react";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {shallow, configure} from "enzyme";
import toJson from "enzyme-to-json";
import { TextEncoder, TextDecoder } from 'util'
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder
import {DesignConfigValues, DesignUtility} from "../../../../shared/persistence/DesignUtility";
import {WidgetPersistence} from "../../../../shared/persistence/WidgetPersistence";
import {WidgetLoader} from "../../../../client/widget/WidgetLoader";
import {RootComponent} from "../../../../client/display_website/RootComponent";
import {ColorScheme} from "../../../../shared/values/ColorScheme";
import {FontSize} from "../../../../shared/values/FontSize";
import {WidgetData} from "../../../../client/widget/WidgetData";
import {RssFeedWidget} from "../../../../client/widget_catalog/rss_feed/RssFeedWidget";
import {CafeteriaMenuWidget} from "../../../../client/widget_catalog/cafeteria_menu/CafeteriaMenuWidget";
import {TramScheduleWidget} from "../../../../client/widget_catalog/tram_schedule/TramScheduleWidget";
import {CafeteriaOpeningWidget} from "../../../../client/widget_catalog/cafeteria_opening/CafeteriaOpeningWidget";
import {
    CafeteriaMenuDisplayComponent
} from "../../../../client/widget_catalog/cafeteria_menu/CafeteriaMenuDisplayComponent";
import {RssFeedConfigComponent} from "../../../../client/widget_catalog/rss_feed/RssFeedConfigComponent";
import {RssFeedDisplayComponent} from "../../../../client/widget_catalog/rss_feed/RssFeedDisplayComponent";
import * as RSSFeedWidgetConfig from "../../../../client/widget_catalog/rss_feed/RSSFeedWidget.json";
import {
    CafeteriaOpeningDisplayComponent
} from "../../../../client/widget_catalog/cafeteria_opening/CafeteriaOpeningDisplayComponent";
import * as TramScheduleConfig from "../../../../client/widget_catalog/tram_schedule/TramSchedule.json";
import {
    TramScheduleDisplayComponent
} from "../../../../client/widget_catalog/tram_schedule/TramScheduleDisplayComponent";
import {TramScheduleConfigComponent} from "../../../../client/widget_catalog/tram_schedule/TramScheduleConfigComponent";

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
const widgetFour = new WidgetData("tram-schedule", 2, {});
const widgetFive = new WidgetData("rss-feed", 2, {});
const widgetDataList = [widgetOne, widgetTwo, widgetFour, widgetFive];

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
            let filler;
            if(widgetId == "cafeteria-menu") {
                filler = new CafeteriaMenuWidget();
                expect(filler.getTitle()).toBe("Cafeteria");
                expect(filler.isConfigurable()).toBe(false);
                expect(filler.getDisplayComponentClass()).toBe(CafeteriaMenuDisplayComponent);
                expect(filler.getDefaultRawConfig()).toBe(undefined);
                expect(filler.getConfigComponentClass()).toBe(undefined);
            }else
            if(widgetId == "tram-schedule") {
                filler = new TramScheduleWidget();
                expect(filler.getTitle()).toBe("Tram Schedule");
                expect(filler.isConfigurable()).toBe(true);
                expect(filler.getDisplayComponentClass()).toBe(TramScheduleDisplayComponent);
                expect(filler.getDefaultRawConfig()).toStrictEqual({
                    stop: TramScheduleConfig.DEFAULT_STOP_NAME,
                    count: TramScheduleConfig.DEFAULT_ITEM_COUNT,
                });
                expect(filler.getConfigComponentClass()).toBe(TramScheduleConfigComponent);
            }else
            if(widgetId == "cafeteria-opening") {
                filler = new CafeteriaOpeningWidget();
                expect(filler.getTitle()).toBe("Cafeteria Status");
                expect(filler.isConfigurable()).toBe(false);
                expect(filler.getDisplayComponentClass()).toBe(CafeteriaOpeningDisplayComponent);
                expect(filler.getDefaultRawConfig()).toBe(undefined);
                expect(filler.getConfigComponentClass()).toBe(undefined);
            }else {
                filler = new RssFeedWidget();
                expect(filler.getTitle()).toBe("RSS Feed");
                expect(filler.isConfigurable()).toBe(true);
                expect(filler.getDisplayComponentClass()).toBe(RssFeedDisplayComponent);
                expect(filler.getDefaultRawConfig()).toStrictEqual({url: RSSFeedWidgetConfig.URL});
                expect(filler.getConfigComponentClass()).toBe(RssFeedConfigComponent);
            }
            return filler;
        });
        jest.useFakeTimers("legacy");
        Promise.resolve().then(() => jest.advanceTimersByTime(16000));
        jest.runOnlyPendingTimers();
        const wrapper = shallow(<RootComponent/>);
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
