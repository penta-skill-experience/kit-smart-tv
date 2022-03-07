import 'jsdom-global/register';
import React from "react";
import {ConfigWebsite} from "../../../../client/config_website/ConfigWebsite";
import {shallow, configure, mount} from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from "enzyme-to-json";
import {act} from 'react-dom/test-utils';
import {AdminStatePersistence} from "../../../../shared/persistence/AdminStatePersistence";
import {DesignConfigPersistence} from "../../../../shared/persistence/DesignConfigPersistence";
import {WidgetPersistence} from "../../../../shared/persistence/WidgetPersistence";
import {AnnouncementPersistence} from "../../../../shared/persistence/announcements/AnnouncementPersistence";
import {
    AnnouncementPersistenceFrontend
} from "../../../../shared/persistence/announcements/AnnouncementPersistenceFrontend";


configure({adapter: new Adapter()});

const getAdminStateMock = jest.spyOn(AdminStatePersistence.prototype, "login");

let wrapper;

describe("config website login page tests", () => {


    beforeEach(()=>{
        wrapper =  shallow(<ConfigWebsite initialLogInStatus={false}/>);
    });


   test("expect login page", async () => {
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

    test("login test", () => {
        getAdminStateMock.mockImplementation(async () => {
            return new Promise<void>( resolve => resolve());
        });
        act(() => {
            wrapper.find("LogInPage").prop("handleLogIn")({target: {value: ''}});
        });
        wrapper.update();
        expect(getAdminStateMock).toHaveBeenCalled();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

});


describe("config website admin interface tests", () => {

    beforeEach(()=>{
        wrapper =  shallow(<ConfigWebsite initialLogInStatus={true}/>);
    });

    test("expect admin interface", async () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    test("handleLogout function test", () => {
        const handleLogoutMock = jest.spyOn(AdminStatePersistence.prototype, "logout");
        handleLogoutMock.mockImplementation(() => {
            return new Promise<void>(resolve => {});
        });
        wrapper.find("ForwardRef(Button)").simulate("click");
        expect(handleLogoutMock).toHaveBeenCalled();
    });

    test("handleColorSchemeChange function test", () => {
        const newWrapper = wrapper.find("PersonalizationPage");
        newWrapper.prop("handleColorSchemeChange")({target:{event: "",newColorScheme:"light" }});
        expect(newWrapper.prop("colorScheme")).toEqual(null);
    });

    test("handleFontSizeChange function test", () => {
        const newWrapper = wrapper.find("PersonalizationPage");
        newWrapper.prop("handleFontSizeChange")({target:{event: "",newFontSize:"small"}});
        expect(newWrapper.prop("fontSize")).toEqual(null);
    });

    test("handlePersonalizationChange function test", () => {
        const setConfigDataMock = jest.spyOn(DesignConfigPersistence.prototype, "setConfigData");
        setConfigDataMock.mockImplementation(() => {
            return new Promise<void>(resolve => {});
        });
        const newWrapper = wrapper.find("PersonalizationPage");
        newWrapper.prop("handlePersonalizationChange")();
        expect(setConfigDataMock).toHaveBeenCalled();
    });

    test("handleWidgetSelection function test", () => {
        const newWrapper = wrapper.find("LayoutPage");
        newWrapper.prop("handleWidgetSelection")({target:{value: "tram-schedule"}});
        expect(newWrapper.prop("widgetListElement")).toEqual({
            "id": 0,
            "position": "",
            "widget": null,
            "widgetData": null,
            "widgetNameText": "",
        })
    });

    test("handleAddWidget function test", () => {
        const newWrapper = wrapper.find("LayoutPage");
        newWrapper.prop("handleAddWidget")();
        expect(newWrapper.prop("list")).toEqual([]);
    });

    test("handleDeleteWidget function test", () => {
        const newWrapper = wrapper.find("LayoutPage");
        newWrapper.prop("handleDeleteWidget")({id: "tram-schedule"});
        expect(newWrapper.prop("list")).toEqual([]);
    });

    test("handlePosition function test", () => {
        const newWrapper = wrapper.find("LayoutPage");
        newWrapper.prop("handlePosition")({id: "tram-schedule", position:1});
        expect(newWrapper.prop("list")).toEqual([]);
    });

    test("handleRawConfigSave function test", () => {
        const newWrapper = wrapper.find("LayoutPage");
        newWrapper.prop("handleRawConfigSave")({id: "tram-schedule", rawConfig:undefined});
        expect(newWrapper.prop("list")).toEqual([]);
    });

    test("handleLayoutChange function test", () => {
        const setWidgetDataListMock = jest.spyOn(WidgetPersistence.prototype, "setWidgetDataList");
        setWidgetDataListMock.mockImplementation(() => {
            return new Promise<Response>(resolve => {});
        })
        const newWrapper = wrapper.find("LayoutPage");
        newWrapper.prop("handleLayoutChange")();
        expect(setWidgetDataListMock).toHaveBeenCalled();
    });

    test("handleOldPassword function test", () => {
        act(() =>{
            wrapper.find("AdminPage").at(0).prop("handleOldPassword")({target:{value: "test"}});
        });
        wrapper.update();
        expect(wrapper.find("AdminPage").at(0).prop("oldPassword")).toBe("test");
    });

    test("handleNewPassword function test", () => {
        act(() =>{
            wrapper.find("AdminPage").at(0).prop("handleNewPassword")({target:{value: "test"}});
        });
        wrapper.update();
        expect(wrapper.find("AdminPage").at(0).prop("newPassword")).toBe("test");
    });

    test("handlePasswordChange function test", () => {
        const handlePasswordChangeMock = jest.spyOn(AdminStatePersistence.prototype, "setPassword");
        handlePasswordChangeMock.mockImplementation(() => {
            return new Promise<void>(resolve => {});
        });
        wrapper.find("AdminPage").prop("handlePasswordChange")({target:{}})
        expect(handlePasswordChangeMock).toHaveBeenCalled();
    });

    test("handleMailChange function test", () => {
        act(() => {
            wrapper.find("AnnouncementsPage").at(0).prop("handleMailChange")({target:{value: "test"}});
        });
        wrapper.update();
        expect(wrapper.find("AnnouncementsPage").prop("verUser")).toEqual({
            mail:'test',
            name:'',
            verUser:null,
        });
    });

    test("handleNameChange function test", () => {
        act(() => {
            wrapper.find("AnnouncementsPage").at(0).prop("handleNameChange")({target:{value: "test"}});
        });
        wrapper.update();
        expect(wrapper.find("AnnouncementsPage").prop("verUser")).toEqual({
            mail:'',
            name:'test',
            verUser:null,
        });
    });

    test("handleAddMail function no input test ", () => {
        act(() => {
            wrapper.find("AnnouncementsPage").at(0).prop("handleAddMail")();
            wrapper.find("AnnouncementsPage").at(0).prop("handleAddMail")();
        });
        wrapper.update();
        expect(wrapper.find("AnnouncementsPage").prop("verUser")).toEqual({
            mail:'',
            name:'',
            verUser:null,
        });
        expect(wrapper.find("AnnouncementsPage").prop("mailList")).toEqual([])
    });

    test("handleAddMail function invalid email test ", () => {
        act(() => {
            wrapper.find("AnnouncementsPage").at(0).prop("handleMailChange")({target:{value: "test"}});
            wrapper.find("AnnouncementsPage").at(0).prop("handleNameChange")({target:{value: "test"}});
            wrapper.find("AnnouncementsPage").at(0).prop("handleAddMail")();
        });
        wrapper.update();
        expect(wrapper.find("AnnouncementsPage").prop("verUser")).toEqual({
            mail:'test',
            name:'test',
            verUser:null,
        });
        expect(wrapper.find("AnnouncementsPage").prop("mailList")).toEqual([]);
    });

    test("handleAddMail function success ", () => {
        act(() => {
            wrapper.find("AnnouncementsPage").at(0).prop("handleMailChange")({target: {value: "test@gmail.com"}});
            wrapper.find("AnnouncementsPage").at(0).prop("handleNameChange")({target: {value: "test"}});
            wrapper.find("AnnouncementsPage").at(0).prop("handleAddMail")();
        });
        wrapper.update();
        expect(wrapper.find("AnnouncementsPage").prop("verUser")).toEqual({
            mail: 'test@gmail.com',
            name: 'test',
            verUser: null,
        });
        expect(wrapper.find("AnnouncementsPage").prop("mailList")).toEqual([{
                mail: 'test@gmail.com',
                name: 'test',
                verUser: {_email: 'test@gmail.com', _name: 'test'},
            }]);

    });

    test("handleDeleteUser function test", () => {
        act(() => {
            wrapper.find("AnnouncementsPage").at(0).prop("handleMailChange")({target: {value: "test@gmail.com"}});
            wrapper.find("AnnouncementsPage").at(0).prop("handleNameChange")({target: {value: "test"}});
            wrapper.find("AnnouncementsPage").at(0).prop("handleAddMail")();
            wrapper.find("AnnouncementsPage").at(0).prop("handleDeleteUser")({
                    mail: 'test@gmail.com',
                    name: 'test',
                    verUser: {_email: 'test@gmail.com', _name: 'test'}
                });
        });
        wrapper.update();
        expect(wrapper.find("AnnouncementsPage").prop("mailList")).toEqual([]);
    });

    test("handleVerUserList function test", () => {
        const setVerifiedUsersMock = jest.spyOn(AnnouncementPersistence.getInstance(), "setVerifiedUsers");
        setVerifiedUsersMock.mockImplementation(() => {
            return new Promise<void>(resolve => {});
        });
        wrapper.find("AnnouncementsPage").prop("handleVerUserList")();
        expect(setVerifiedUsersMock).toHaveBeenCalled();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });



});
