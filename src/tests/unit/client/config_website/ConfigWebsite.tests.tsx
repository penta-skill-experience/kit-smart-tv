import React from "react";
import {ConfigWebsite} from "../../../../client/config_website/ConfigWebsite";
import {shallow, configure} from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from "enzyme-to-json";

configure({adapter: new Adapter()});

test("snapshot test for config website", () => {
    /*const tree = renderer.create(<ConfigWebsite></ConfigWebsite>).toJSON;
    expect(tree).toMatchSnapshot();*/
    /*const wrapper = shallow(<ConfigWebsite/>);
    expect(toJson(wrapper)).toMatchSnapshot();*/
});

describe("hanlde methods test", () => {
   test("snapshot test for login page", async () => {
       const wrapper = shallow(<ConfigWebsite/>);
      // console.log(wrapper);
       await new Promise(process.nextTick);
       expect(toJson(wrapper)).toMatchSnapshot();
   });
});
