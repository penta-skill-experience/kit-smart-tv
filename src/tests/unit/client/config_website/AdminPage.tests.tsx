import {shallow, configure} from "enzyme";
import {ConfigWebsite} from "../../../../client/config_website/ConfigWebsite";
import {AdminPage} from "../../../../client/config_website/AdminPage";
import React from "react";
import renderer from 'react-test-renderer';
import toJson from "enzyme-to-json";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({adapter: new Adapter()});

describe("Admin page tests", () => {
    let wrapper;
    const method = () => {
    };

    beforeEach(()=>{
        wrapper =  shallow(
            <AdminPage
                oldPassword={''}
                newPassword={''}
                handleOldPassword={method}
                handleNewPassword={method}
                handlePasswordChange={method}
            >
            </AdminPage>
        );
    });


    test("snapshot test for personalisation page", async () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });

});



