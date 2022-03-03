import fetchMock from "jest-fetch-mock";
import {DesignValuesPersistence} from "../../../../shared/persistence/DesignValuesPersistence";
fetchMock.enableMocks();

const testFontSizeSmall = {
    id: "small",
    name: "small",
    relativeSize: 0.8
};
const testFontSizeMedium = {
    id: "medium",
    name: "medium",
    relativeSize: 1
}

const testFontSizeLarge = {
    id: "large",
    name: "large",
    relativeSize: 1.15
}

const testColorSchemeDark = {
    id: "dark",
    name: "dark",
    titleFontColor: "white",
    bodyFontColor: "white",
    specialBoldFontColor: "ForestGreen",
    specialSubtleFontColor: "DarkOrange",
    accentBarColor: "rgba(0, 0, 0, 0.5)",
    backgrounds: [
        "https://wallpaperaccess.com/full/1379469.jpg",
        "https://images.pexels.com/photos/847402/pexels-photo-847402.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    ]
}

const testColorSchemeLight = {
    id: "light",
    name: "light",
    titleFontColor: "black",
    bodyFontColor: "black",
    specialBoldFontColor: "green",
    specialSubtleFontColor: "FireBrick",
    accentBarColor: "rgba(255, 255, 255, 0.5)",
    backgrounds: [
        "https://images.pexels.com/photos/2101187/pexels-photo-2101187.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    ]
}

const testFontSizes = [
    testFontSizeSmall,
    testFontSizeMedium,
    testFontSizeLarge
];

const testColorSchemes = [
    testColorSchemeDark,
    testColorSchemeLight
];

const testFetchResponse = {
    fontSizes: testFontSizes,
    colorSchemes: testColorSchemes
};

afterEach(() => {
    jest.restoreAllMocks();
    fetchMock.mockClear();
    sessionStorage.clear();
});

describe("testing DesignValuesPersistence", () => {
    beforeAll(() => {
        fetchMock.mockResponse(JSON.stringify(testFetchResponse));
    });

    test("testing getColorSchemeTypes", () => {
        new DesignValuesPersistence().getColorSchemeTypes().then(colorSchemes => {
            expect(colorSchemes).toEqual(testColorSchemes);
        });
    });

    test("testing getColorScheme", () => {
        new DesignValuesPersistence().getColorScheme(testColorSchemeLight.id).then(lightTheme => {
            expect(lightTheme).toEqual(testColorSchemeLight);
        });
    });

    test("testing getFontSizes", () => {
        new DesignValuesPersistence().getFontSizes().then(fontSizes => {
            expect(fontSizes).toEqual(testFontSizes);
        });
    });

    test("testing getFontSize", () => {
        new DesignValuesPersistence().getFontSize(testFontSizeMedium.id).then(mediumFontSize => {
            expect(mediumFontSize).toEqual(testFontSizeMedium);
        });
    });
});