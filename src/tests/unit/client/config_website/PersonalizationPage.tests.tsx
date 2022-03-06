import {shallow, configure} from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import * as React from "react";
import toJson from "enzyme-to-json";
import {PersonalizationPage} from "../../../../client/config_website/PersonalizationPage";
import {DesignValuesPersistence} from "../../../../shared/persistence/DesignValuesPersistence";
import {ConfigData, ValuesData} from "../../../../shared/interfaces/interfaces";
import testImage  from "./test.jpg";
import {FontSize} from "../../../../shared/values/FontSize";
import {ColorScheme} from "../../../../shared/values/ColorScheme";
import {DesignConfigPersistence} from "../../../../shared/persistence/DesignConfigPersistence";

configure({adapter: new Adapter()});

const componentDidMountMock = jest.spyOn(DesignValuesPersistence.prototype,"getValuesData");
const setConfigDataMock = jest.spyOn(DesignConfigPersistence.prototype, "setConfigData");


const testConfigData = {
    fontSize: "small",
    colorScheme: "light",
    background: "test.img",
}

let fontSizeList : FontSize[] = [{id: "1", name: "arial", relativeSize: 5}];
let colorSchemeList : ColorScheme[] = [{
    id: "1",
    name: "light",
    titleFontColor: "blue",
    bodyFontColor: "yellow",
    specialBoldFontColor: "black",
    specialSubtleFontColor: "green",
    accentBarColor: "pink",
    backgrounds: [testImage],

}];

const testValuesData = {
    fontSizes: fontSizeList,
    colorSchemes: colorSchemeList,
} as ValuesData;

componentDidMountMock.mockImplementation(() => {
    return new Promise<ValuesData>(resolve => {
    });
});

setConfigDataMock.mockImplementation(() => {
    return new Promise<void>(resolve => {});
});

let wrapper;
const method = () => {
};

afterAll(() => {
    jest.restoreAllMocks();
})

describe("Personalization page tests", () => {

    beforeEach(() => {
        wrapper = shallow(
            <PersonalizationPage
                colorScheme={''}
                fontSize={''}
                handleColorSchemeChange={method}
                handleFontSizeChange={method}
                selectedBackground={method}
                handleBackgroundSelect={method}
                handlePersonalizationChange={method}
            >
            </PersonalizationPage>
        );
    });


    test("snapshot test for personalization page", async () => {
        wrapper.setState({
            loadedDesignState: true,
            designValues: testValuesData,
            designConfig: testConfigData,
            successfulBar:false,
            errorBar:false,
            sessionErrorBar:false,
        });
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    test("snapshot for render background function", async () => {
        const backgroundWrapper = shallow(
            <PersonalizationPage
                colorScheme={'1'}
                fontSize={''}
                handleColorSchemeChange={method}
                handleFontSizeChange={method}
                selectedBackground={method}
                handleBackgroundSelect={method}
                handlePersonalizationChange={method}
            >
            </PersonalizationPage>
        )
        expect(toJson(backgroundWrapper)).toMatchSnapshot();
    });

    test("handleClose function test", () => {
        wrapper.find("ForwardRef(Snackbar)").at(0).simulate("close");
        expect(wrapper.find("ForwardRef(Snackbar)").at(0).prop("open")).toEqual(false);
    });

    test("handleClose function if case test", () => {
        wrapper.find("ForwardRef(Snackbar)").at(0).simulate("close", { target: { event: '', reason: 'clickaway'} });
        expect(wrapper.find("ForwardRef(Snackbar)").at(0).prop("open")).toEqual(false);
    });
});

describe("snack bar test", () => {

    test("handlePersonalization change test", () => {
        const handlePersonalizationChangeThenMock = jest.fn(() => Promise.resolve(true));
        wrapper = shallow(
            <PersonalizationPage
                colorScheme={''}
                fontSize={''}
                handleColorSchemeChange={method}
                handleFontSizeChange={method}
                selectedBackground={method}
                handleBackgroundSelect={method}
                handlePersonalizationChange={handlePersonalizationChangeThenMock}
            >
            </PersonalizationPage>
        );

        wrapper.find("ForwardRef(Button)").at(0).simulate("click");
        expect(handlePersonalizationChangeThenMock).toHaveBeenCalled();
    });

    test("handlePersonalization change test", () => {
        const handlePersonalizationChangeCatchMock = jest.fn(() => Promise.resolve(false));
        wrapper = shallow(
            <PersonalizationPage
                colorScheme={''}
                fontSize={''}
                handleColorSchemeChange={method}
                handleFontSizeChange={method}
                selectedBackground={method}
                handleBackgroundSelect={method}
                handlePersonalizationChange={handlePersonalizationChangeCatchMock}
            >
            </PersonalizationPage>
        );

        wrapper.find("ForwardRef(Button)").at(0).simulate("click");
        expect(handlePersonalizationChangeCatchMock).toHaveBeenCalled();
    });

});

describe("background image render test", () => {

    test("snapshot for render background function", async () => {
        const backgroundWrapper = shallow(
            <PersonalizationPage
                colorScheme={'1'}
                fontSize={''}
                handleColorSchemeChange={method}
                handleFontSizeChange={method}
                selectedBackground={method}
                handleBackgroundSelect={method}
                handlePersonalizationChange={method}
            >
            </PersonalizationPage>
        )
        expect(toJson(backgroundWrapper)).toMatchSnapshot();
    });
});