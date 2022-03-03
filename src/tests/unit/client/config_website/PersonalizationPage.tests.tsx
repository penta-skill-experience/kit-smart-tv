import {shallow, configure} from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import * as React from "react";
import toJson from "enzyme-to-json";
import {PersonalizationPage} from "../../../../client/config_website/PersonalizationPage";
import {DesignValuesPersistence} from "../../../../shared/persistence/DesignValuesPersistence";
import {ConfigData, ValuesData} from "../../../../shared/interfaces/interfaces";

configure({adapter: new Adapter()});

const componentDidMountMock = jest.spyOn(DesignValuesPersistence.prototype,"getValuesData");

componentDidMountMock.mockImplementation(() => {
    return new Promise<ValuesData>(resolve => {
    });
});

let wrapper;
const method = () => {
};

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

afterAll(() => {
    jest.restoreAllMocks();
})

describe("Layout page tests", () => {

    test("snapshot test for personalization page", async () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });


});