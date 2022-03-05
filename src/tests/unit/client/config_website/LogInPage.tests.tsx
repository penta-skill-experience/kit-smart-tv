import {shallow, configure} from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import * as React from "react";
import toJson from "enzyme-to-json";
import {LogInPage} from "../../../../client/config_website/LogInPage";


configure({adapter: new Adapter()});

let wrapper;
const method = () => {};

describe("LogInPage tests", () => {

    beforeEach(() => {
        wrapper = shallow(
            <LogInPage
                logInInput={''}
                visible={''}
                handleInput={method}
                handleLogIn={method}
                handleClickShowPassword={method}
            >
            </LogInPage>
        );
    });

    test("snapshot test for login page", async () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});