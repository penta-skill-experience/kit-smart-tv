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

    test("RSS-Feed Snapshot parse successful", async () => {
        fetchMock.mockResponse("\n<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n" +
            "<rss version=\"2.0\">\n" +
            "\n" +
            "<channel>\n" +
            "  <title>W3Schools Home Page</title>\n" +
            "  <link>https://www.w3schools.com</link>\n" +
            "  <description>Free web building tutorials</description>\n" +
            "  <item>\n" +
            "    <title>RSS Tutorial</title>\n" +
            "    <link>https://www.w3schools.com/xml/xml_rss.asp</link>\n" +
            "    <description>New RSS tutorial on W3Schools</description>\n" +
            "  </item>\n" +
            "  <item>\n" +
            "    <title>XML Tutorial</title>\n" +
            "    <link>https://www.w3schools.com/xml</link>\n" +
            "    <description>New XML tutorial on W3Schools</description>\n" +
            "  </item>\n" +
            "</channel>\n" +
            "\n" +
            "</rss> ");
        const wrapper = shallow(<RssFeedDisplayComponent error={(msg => {})} config={RSSFeedWidgetConfig.URL} specialBoldFontColor={"ForestGreen"} specialSubtleFontColor={"DarkOrange"}/>);
        await new Promise(process.nextTick);
        expect(toJson(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });

    test("RSS-Feed Snapshot parse successful", async () => {
        fetchMock.mockResponse("not an rss feed");
        const wrapper = shallow(<RssFeedDisplayComponent error={(msg => {})} config={RSSFeedWidgetConfig.URL} specialBoldFontColor={"ForestGreen"} specialSubtleFontColor={"DarkOrange"}/>);
        await new Promise(process.nextTick);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    test("Rss-Feed Snapshot fallback", async () => {
        fetchMock.mockResponse("\n<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n" +
            "<rss version=\"2.0\">\n" +
            "\n" +
            "<channel>\n" +
            "  <title>W3Schools Home Page</title>\n" +
            "  <link>https://www.w3schools.com</link>\n" +
            "  <description>Free web building tutorials</description>\n" +
            "  <item>\n" +
            "    <title>RSS Tutorial</title>\n" +
            "    <link>https://www.w3schools.com/xml/xml_rss.asp</link>\n" +
            "    <description>New RSS tutorial on W3Schools</description>\n" +
            "  </item>\n" +
            "  <item>\n" +
            "    <title>XML Tutorial</title>\n" +
            "    <link>https://www.w3schools.com/xml</link>\n" +
            "    <description>New XML tutorial on W3Schools</description>\n" +
            "  </item>\n" +
            "</channel>\n" +
            "\n" +
            "</rss> ");
        const wrapper = shallow(<RssFeedDisplayComponent error={(msg => {})} config={RSSFeedWidgetConfig.URL} specialBoldFontColor={"ForestGreen"} specialSubtleFontColor={"DarkOrange"}/>);
        await new Promise(process.nextTick);
        wrapper.setState({
            loaded: true,
            loadedRss: false
        });
        await new Promise(process.nextTick);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
});