import {shallow, configure} from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import * as React from "react";
import toJson from "enzyme-to-json";
import {AnnouncementsPage} from "../../../../client/config_website/AnnouncementsPage";
import {AdminStatePersistence} from "../../../../shared/persistence/AdminStatePersistence";
import {AnnouncementPersistence} from "../../../../shared/persistence/announcements/AnnouncementPersistence";
import {
    AnnouncementPersistenceFrontend
} from "../../../../shared/persistence/announcements/AnnouncementPersistenceFrontend";


configure({adapter: new Adapter()});

const method = () => {};
let wrapper;
let list = [{mail: "testEmail@gmail.com", name: "Bob", verUser: {mail: "testEmail@gmail.com", name: "Bob"}}];
const verUserListElement = {
    mail:'',
    name:'',
    verUser:null,
};

const handleDeleteUserMock = () => {
    list = [];
}

const getAdminLoginStateMock = jest.spyOn(AdminStatePersistence.prototype, "getAdminLoginState");
const setVerifiedUsersMock = jest.spyOn(AnnouncementPersistenceFrontend.prototype, "setVerifiedUsers");

describe("Announcement page tests", () => {

    beforeEach(() => {
        wrapper = shallow(
            <AnnouncementsPage
                mailList={list}
                verUser={verUserListElement}
                handleMailChange={method}
                handleNameChange={method}
                handleAddMail={method}
                handleDeleteUser={handleDeleteUserMock}
                handleVerUserList={setVerifiedUsersMock}
            >
            </AnnouncementsPage>
        );
    });

    test("snapshot test for announcement page", async () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    test("delete user test", () => {
        wrapper.find("ForwardRef(Button)").at(1).simulate("click");
        expect(list).toEqual([]);
    });

    test("save ver user test", () => {
        setVerifiedUsersMock.mockImplementation(list => {
            return new Promise<void>(resolve => {
                resolve();
            });
        });
        getAdminLoginStateMock.mockImplementation(() => {
            return new Promise<void>(resolve => {
                resolve();
            });
        })
        wrapper.find("ForwardRef(Button)").at(1).simulate("click");
        expect(setVerifiedUsersMock).toHaveBeenCalled();
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

    afterEach(() => {
        jest.restoreAllMocks();
    });

});

describe("add verified user tests", () => {

    test("invalid mail bar test", () => {
        const errorType0Mock = () => {return 0};
        wrapper = shallow(
            <AnnouncementsPage
                mailList={list}
                verUser={verUserListElement}
                handleMailChange={method}
                handleNameChange={method}
                handleAddMail={errorType0Mock}
                handleDeleteUser={method}
                handleVerUserList={method}
            >
            </AnnouncementsPage>
        );
        wrapper.find("ForwardRef(Button)").at(0).simulate("click");
        expect(wrapper.find("ForwardRef(Snackbar)").at(0).prop("open")).toEqual(true);
    });

    test("double mail bar test", () => {
        const errorType1Mock = () => {return 1};
        wrapper = shallow(
            <AnnouncementsPage
                mailList={list}
                verUser={verUserListElement}
                handleMailChange={method}
                handleNameChange={method}
                handleAddMail={errorType1Mock}
                handleDeleteUser={method}
                handleVerUserList={method}
            >
            </AnnouncementsPage>
        );
        wrapper.find("ForwardRef(Button)").at(0).simulate("click");
        expect(wrapper.find("ForwardRef(Snackbar)").at(1).prop("open")).toEqual(true);
    });

    test("invalid mail bar test", () => {
        const errorType2Mock = () => {return 2};
        wrapper = shallow(
            <AnnouncementsPage
                mailList={list}
                verUser={verUserListElement}
                handleMailChange={method}
                handleNameChange={method}
                handleAddMail={errorType2Mock}
                handleDeleteUser={method}
                handleVerUserList={method}
            >
            </AnnouncementsPage>
        );
        wrapper.find("ForwardRef(Button)").at(0).simulate("click");
        expect(wrapper.find("ForwardRef(Snackbar)").at(2).prop("open")).toEqual(true);
    });
});