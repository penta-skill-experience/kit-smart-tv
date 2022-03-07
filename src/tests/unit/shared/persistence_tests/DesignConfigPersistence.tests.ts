import fetchMock from "jest-fetch-mock";
import {DesignConfigPersistence} from "../../../../shared/persistence/DesignConfigPersistence";
fetchMock.enableMocks();

const testFontSize = "large";
const testColorScheme = "light";
const testBackground = "https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg";


afterEach(() => {
    jest.restoreAllMocks();
    fetchMock.mockClear();
    sessionStorage.clear();
});

describe("testing DesignConfigPersistence getters", () => {

    beforeAll(() => {
         fetchMock.mockResponse(JSON.stringify({
             fontSize: testFontSize,
             colorScheme: testColorScheme,
             background: testBackground
         }));
     });

    test("testing getSelectedFontSizeId", () => {
        new DesignConfigPersistence().getSelectedFontSizeId().then(fontSize => {
            expect(fontSize).toEqual(testFontSize);
        });
    });

    test("testing getSelectedColorSchemeId", () => {
        new DesignConfigPersistence().getSelectedColorSchemeId().then(colorScheme => {
            expect(colorScheme).toEqual(testColorScheme);
        });
    });

    test("testing getSelectedBackground", () => {
        new DesignConfigPersistence().getSelectedBackground().then(background => {
            expect(background).toEqual(testBackground);
        });
    });
});

describe("testing individual designConfigPersistence setters", () => {
    beforeEach(() => {
        fetchMock.mockResponseOnce(JSON.stringify({
            fontSize: testFontSize,
            colorScheme: testColorScheme,
            background: testBackground
        })).mockResponseOnce(JSON.stringify({status: 200}));
    });

    test("testing setSelectedFontSizeId", async () => {
        const changedFontSize = "small";

        await new DesignConfigPersistence().setSelectedFontSize(changedFontSize);

        expect(fetchMock.mock.calls.length).toEqual(2);
        expect(fetchMock.mock.calls[1][1].body).toEqual(JSON.stringify({
            fontSize: changedFontSize,
            colorScheme: testColorScheme,
            background: testBackground
        }));
    });

    test("testing setSelectedColorSchemeId", async () => {
        const changedColorScheme = "dark";

        await new DesignConfigPersistence().setSelectedColorSchemeId(changedColorScheme);

        expect(fetchMock.mock.calls.length).toEqual(2);
        expect(fetchMock.mock.calls[1][1].body).toEqual(JSON.stringify({
            fontSize: testFontSize,
            colorScheme: changedColorScheme,
            background: testBackground
        }));
    });

    test("testing setSelectedBackground", async () => {
        const changedBackground = "new background";

        await new DesignConfigPersistence().setSelectedBackground(changedBackground);

        expect(fetchMock.mock.calls.length).toEqual(2);
        expect(fetchMock.mock.calls[1][1].body).toEqual(JSON.stringify({
            fontSize: testFontSize,
            colorScheme: testColorScheme,
            background: changedBackground
        }));
    });
});

describe("testing setConfigData", () => {
    const configData = {
        fontSize: testFontSize,
        colorScheme: testColorScheme,
        background: testBackground
    };

    test("setConfigData successful", async () => {
        fetchMock.mockResponse(JSON.stringify({status: 200}));
        sessionStorage.setItem("accessToken", "currentAccessToken");

        await new DesignConfigPersistence().setConfigData(configData);

        expect(fetchMock.mock.calls.length).toEqual(1);
        expect(fetchMock.mock.calls[0][1].method).toEqual("PUT");
        expect(fetchMock.mock.calls[0][1].body).toEqual(JSON.stringify(configData));
    });

    test("setConfigData rejects for wrong response status", () => {
        fetchMock.mockResponse(JSON.stringify({status: 400}));

        new DesignConfigPersistence().setConfigData(configData).then(() => {throw Error("resolved with invalid status")}).catch(() => {});
    });

    test("setConfigData rejects if fetch rejects", () => {
        const testError = new Error("testReason");
        fetchMock.mockReject(testError);

        new DesignConfigPersistence().setConfigData(configData).then(() => {
            throw new Error("setConfigData didn't reject when fetch failed");
        }).catch(e => {});
    });
});