import {shallow, configure} from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import * as React from "react";
import toJson from "enzyme-to-json";
import {WidgetConfigPage} from "../../../../client/config_website/WidgetConfigPage";


configure({adapter: new Adapter()});

let wrapper;

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

});