import {shallow, configure} from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {LayoutPage} from "../../../../client/config_website/LayoutPage";
import * as React from "react";
import toJson from "enzyme-to-json";

configure({adapter: new Adapter()});

describe("Layout page tests", () => {
    let wrapper;
    const list = [];
    const widgetListElement = {
        id:0,
        position:'',
        widgetNameText:'',
        widget: null,
        widgetData:null,
    };
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

});