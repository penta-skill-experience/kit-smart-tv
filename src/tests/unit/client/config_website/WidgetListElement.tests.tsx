import {shallow, configure} from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import * as React from "react";
import toJson from "enzyme-to-json";
import {WidgetListElement, DeleteDialogComponent} from "../../../../client/config_website/WidgetListElement";
import {TramScheduleWidget} from "../../../../client/widget_catalog/tram_schedule/TramScheduleWidget";

configure({adapter: new Adapter()});

let wrapper;
const method = () => {};
const testWidget = new TramScheduleWidget();
const testWidgetData = {
    widgetId: "time",
    location: 2,
    rawConfig: undefined,
};

const testItem = {
    id:0,
    position:'2',
    widgetNameText:'name',
    widget: testWidget,
    widgetData:testWidgetData,
}

const handlePositionMock = jest.fn();
const handleDeleteWidgetMock = jest.fn();

describe("Widget list element tests", () => {

    beforeEach(() => {
            wrapper = shallow(
                <WidgetListElement
                    item={testItem}
                    handlePosition={handlePositionMock}
                    handleDeleteWidget={handleDeleteWidgetMock}
                    handleRawConfigSave={method}
                >
                </WidgetListElement>
            );
    });

    test("snapshot test for widget list element", () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    })

    test("test radio on change function", () => {
        const newWrapper = shallow(wrapper.find("ForwardRef(FormControlLabel)").at(0).prop("control"));
        newWrapper.find("MuiRadioRoot").at(0).simulate("change");
        expect(handlePositionMock).toHaveBeenCalled();
    })

    test("handleDeleteWidget test", () => {
        wrapper.find("DeleteDialogComponent").prop("handleDeleteWidget")({target:{}});
        expect(handleDeleteWidgetMock).toHaveBeenCalled();
    });

});

describe("Delete Dialog Component tests", () => {
    let deleteDialogComponentWrapper;
    beforeEach(() => {
        deleteDialogComponentWrapper = shallow(
            <DeleteDialogComponent
                id={""}
                handleDeleteWidget={method}
            />
        );
    });

    test("snapshot test for DeleteDialogComponent", () => {
        expect(toJson(deleteDialogComponentWrapper)).toMatchSnapshot();
    });

    test("handleOpen test", () => {
        deleteDialogComponentWrapper.find("ForwardRef(Button)").at(0).simulate("click");
        expect(deleteDialogComponentWrapper.find("ForwardRef(Dialog)").prop("open")).toEqual(true);
    });

    test("handleDisagree test", () => {
        deleteDialogComponentWrapper.find("ForwardRef(Button)").at(1).simulate("click");
        expect(deleteDialogComponentWrapper.find("ForwardRef(Dialog)").prop("open")).toEqual(false);
    });

    test("handleAgree test", () => {
        deleteDialogComponentWrapper.find("ForwardRef(Button)").at(2).simulate("click");
        expect(deleteDialogComponentWrapper.find("ForwardRef(Dialog)").prop("open")).toEqual(false);
    });
})