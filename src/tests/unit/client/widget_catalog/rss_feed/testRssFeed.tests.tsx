/**
 * @jest-environment jsdom
 */
import React from "react";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {configure, shallow} from "enzyme";
import toJson from "enzyme-to-json";
import {RssFeedDisplayComponent} from "../../../../../client/widget_catalog/rss_feed/RssFeedDisplayComponent";
import * as RSSFeedWidgetConfig from "../../../../../client/widget_catalog/rss_feed/RSSFeedWidget.json";
import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();

const responseMock = jest.spyOn(Response.prototype, "json");

global.Headers = class {
    constructor() {};
    append(var1 : string, var2 : string) {};
} as jest.Mock;
configure({adapter: new Adapter()});

describe("RSS-Feed Snapshots", () => {
    test("RSS-Feed Snapshot", async () => {
        fetchMock.mockResponse("test.google.com");
        const wrapper = shallow(<RssFeedDisplayComponent error={(msg => {})} config={RSSFeedWidgetConfig.URL} specialBoldFontColor={"ForestGreen"} specialSubtleFontColor={"DarkOrange"}/>);
        //wrapper.setState({loaded: true, loadedRss: true});
        await new Promise(process.nextTick);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
});