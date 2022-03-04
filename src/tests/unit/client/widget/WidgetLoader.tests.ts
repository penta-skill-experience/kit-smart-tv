import {WidgetLoader} from "../../../../client/widget/WidgetLoader";

describe("widget loading", () => {

    test("widget present", () => {
        const widgetLoader = new WidgetLoader();
        const widget = widgetLoader.getWidget("rss-feed");
        expect(widget.getTitle()).toEqual("RSS Feed");
        expect(widget.isConfigurable()).toEqual(true);
    });

    test("widget not present", () => {
        const widgetLoader = new WidgetLoader();
        expect(() => widgetLoader.getWidget("should-not-exist")).toThrow();
    });

    test("widget IDs", () => {
        const widgetLoader = new WidgetLoader();
        expect(widgetLoader.getWidgetIds()).toContain("rss-feed");
    });
});