import {DesignConfigPersistence} from "../../../../shared/persistence/DesignConfigPersistence";
import {DesignValuesPersistence} from "../../../../shared/persistence/DesignValuesPersistence";
import {DesignUtility} from "../../../../shared/persistence/DesignUtility";

const configMock = jest.spyOn(DesignConfigPersistence.prototype, "getConfigData");
const valuesMock = jest.spyOn(DesignValuesPersistence.prototype, "getValuesData");

afterEach(() => {
    jest.restoreAllMocks();
});

describe("testing DesignUtility", () => {
    const testConfig = {
        fontSize: "large",
        colorScheme: "light",
        background: "https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg"

    }

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

    const testValues = {
        fontSizes: testFontSizes,
        colorSchemes: testColorSchemes
    }

    beforeEach(() => {
         configMock.mockImplementation(() => {
             return new Promise(resolve => {resolve(testConfig)});
         });
         valuesMock.mockImplementation(() => {
             return new Promise(resolve => {resolve(testValues)});
         });
     });

    test("testing getDesignConfigValues", () => {
        DesignUtility.getDesignConfigValues().then(configValues => {
            expect(configValues).toEqual({
                fontSize: testFontSizeLarge,
                colorScheme: testColorSchemeLight,
                background: testConfig.background
            });
        });
    });
});