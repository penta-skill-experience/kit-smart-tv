import fetchMock from "jest-fetch-mock";
import {WidgetPersistence} from "../../../../shared/persistence/WidgetPersistence";
import {DesignConfigPersistence} from "../../../../shared/persistence/DesignConfigPersistence";
fetchMock.enableMocks();

afterEach(() => {
    jest.restoreAllMocks();
    fetchMock.mockClear();
});

describe("testing getters", () => {
    const testWidgets = {
        widgetDataList: [
            {
                widgetId: "cafeteria-menu",
                location: 2
            },
            {
                widgetId: "tram-schedule",
                location: 3,
                rawConfig: {
                    stop: "Durlacher Tor/K I T (U)",
                    count: 6
                }
            }
        ]
    };

    beforeEach(() => {
        fetchMock.mockResponse(JSON.stringify(testWidgets));
    });

    test("testing getWidgetDataList", () => {
        new WidgetPersistence().getWidgetDataList().then(widgets => {
            expect(widgets).toEqual(testWidgets.widgetDataList);
        });
    });
});

describe("testing setWidgetData", () => {

    test("setConfigData successful", async () => {
        fetchMock.mockResponse(JSON.stringify({status: 200}));
        sessionStorage.setItem("accessToken", "currentAccessToken");

        await new WidgetPersistence().setWidgetDataList([]);

        expect(fetchMock.mock.calls.length).toEqual(1);
        expect(fetchMock.mock.calls[0][1].method).toEqual("PUT");
        expect(fetchMock.mock.calls[0][1].body).toEqual(JSON.stringify({
            widgetDataList: []
        }));
    });
})