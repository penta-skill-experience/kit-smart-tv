import React from "react";
import {ConfigWebsite} from "../../../../client/config_website/ConfigWebsite";
import {shallow, configure} from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from "enzyme-to-json";
import {act} from 'react-dom/test-utils';


configure({adapter: new Adapter()});

describe("hanlde methods test", () => {

    let wrapper;
    beforeEach(()=>{
        wrapper =  shallow(<ConfigWebsite/>);
    });


   test("snapshot test for login page", async () => {
       expect(toJson(wrapper)).toMatchSnapshot();
   });

    test("test for password input", async () => {

        expect(wrapper.find("LogInPage").at(0).prop("logInInput")).toEqual("");
        act(() => {
            wrapper.find("LogInPage").prop("handleInput")({target: {value:"password123"}});
        })
        wrapper.update();
        expect(wrapper.find("LogInPage").at(0).prop("logInInput")).toBe("password123");
    });


});
