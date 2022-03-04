import {shallow, configure} from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import * as React from "react";
import toJson from "enzyme-to-json";
import {AnnouncementsPage} from "../../../../client/config_website/AnnouncementsPage";


configure({adapter: new Adapter()});

describe("Announcement page tests", () => {
    let wrapper;
    const list = [];
    const verUserListElement = {
        mail:'',
        name:'',
        verUser:null,
    };
    const method = () => {
    };



    beforeEach(() => {
        wrapper = shallow(
            <AnnouncementsPage
                mailList={list}
                verUser={verUserListElement}
                handleMailChange={method}
                handleNameChange={method}
                handleAddMail={method}
                handleDeleteUser={method}
                handleVerUserList={method}
            >
            </AnnouncementsPage>
        );
    });

    test("snapshot test for announcement page", async () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });

});