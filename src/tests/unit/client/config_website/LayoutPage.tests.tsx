import {shallow, configure} from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {LayoutPage} from "../../../../client/config_website/LayoutPage";
import * as React from "react";
import toJson from "enzyme-to-json";
import {AdminStatePersistence} from "../../../../shared/persistence/AdminStatePersistence";

configure({adapter: new Adapter()});

describe("Layout page tests", () => {
    let wrapper;
    const getAdminLoginStateMock = jest.spyOn(AdminStatePersistence.prototype, "getAdminLoginState");
    const widgetListElement = {
        id:0,
        position:'',
        widgetNameText:'',
        widget: null,
        widgetData:null,
    };

    const list = [widgetListElement];

    const method = () => {
    };



    beforeEach(() => {
       wrapper = shallow(
           <LayoutPage
               list={list}
               widgetListElement={widgetListElement}
               handleWidgetSelection={method}
               handleAddWidget={method}
               handleDeleteWidget={method}
               handlePosition={method}
               handleRawConfigSave={method}
               handleLayoutChange={method}
           >

           </LayoutPage>
       );
    });

    test("snapshot test for layout page", async () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    test("save button test", () => {
        getAdminLoginStateMock.mockImplementation(() => {
            return new Promise<void>(resolve => {
                resolve();
            });
        })
        wrapper.find("ForwardRef(Button)").at(1).simulate("click");
        expect(getAdminLoginStateMock).toHaveBeenCalled();
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