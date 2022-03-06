import {shallow, configure} from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import * as React from "react";
import toJson from "enzyme-to-json";
import {WidgetConfigPage} from "../../../../client/config_website/WidgetConfigPage";
import {ConfigComponent} from "../../../../client/widget/ConfigComponent";


configure({adapter: new Adapter()});

let wrapper;

//const saveMock = jest.spyOn(ConfigComponent.prototype, "save");

describe("WidgetConfigPage tests", () => {

    beforeEach(() => {
        wrapper = shallow(
            <WidgetConfigPage
                configComponentClass={undefined}
                save={undefined}
                rawConfig={undefined}>
            </WidgetConfigPage>
        );
    });

    test("snapshot test for WidgetConfigPage", async () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    test("test config button", () => {
        wrapper.find("ForwardRef(Button)").at(0).simulate("click");
        expect(wrapper.find("ForwardRef(Dialog)").prop("open")).toEqual(true);
    });

    test("test close button", () => {
        wrapper.find("ForwardRef(Dialog)").at(0).simulate("close");
        expect(wrapper.find("ForwardRef(Dialog)").prop("open")).toEqual(false);
    });

    test("test config cancel button", () => {
        wrapper.find("ForwardRef(Button)").at(1).simulate("click");
        expect(wrapper.find("ForwardRef(Dialog)").prop("open")).toEqual(false);
    });

    /*test("test config ok button", () => {
        saveMock.mockImplementation();
        wrapper.find("ForwardRef(Button)").at(2).simulate("click");
        expect(wrapper.find("ForwardRef(Dialog)").prop("open")).toEqual(false);
    });*/


});