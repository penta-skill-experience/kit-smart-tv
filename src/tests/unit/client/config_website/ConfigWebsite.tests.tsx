import React from "react";
import {ConfigWebsite, TabPanel} from "../../../../client/config_website/ConfigWebsite";
import {shallow, configure} from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from "enzyme-to-json";
import {act} from 'react-dom/test-utils';
import {AdminStatePersistence} from "../../../../shared/persistence/AdminStatePersistence";
import {DesignConfigPersistence} from "../../../../shared/persistence/DesignConfigPersistence";
import {WidgetPersistence} from "../../../../shared/persistence/WidgetPersistence";
import {AnnouncementPersistence} from "../../../../shared/persistence/announcements/AnnouncementPersistence";
import {ConfigData} from "../../../../shared/interfaces/interfaces";
import {undefined} from "zod";
import { WidgetData } from "../../../../client/widget/WidgetData";
import {VerifiedUser} from "../../../../shared/values/VerifiedUser";


configure({adapter: new Adapter()});

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
        const getAdminStateMock = jest.spyOn(AdminStatePersistence.prototype, "login");
        getAdminStateMock.mockImplementation(() => {
            return new Promise<void>( resolve => resolve());
        });
        act(() => {
            wrapper.find("LogInPage").prop("handleLogIn")({target: {value: ''}});
        });
        wrapper.update();
        expect(getAdminStateMock).toHaveBeenCalled();
    });

    test("handleClickShowPassword function test", () => {
        act(() =>{
            wrapper.find("LogInPage").prop("handleClickShowPassword")();
        });
        wrapper.update();
        expect(wrapper.find("LogInPage").prop("visible")).toEqual(true);
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
            return new Promise<void>(resolve => {resolve()});
        });
        wrapper.find("ForwardRef(Button)").simulate("click");
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
            return new Promise<void>(resolve => {resolve()});
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
            return new Promise<void>(resolve => {resolve()});
        });
        wrapper.find("AnnouncementsPage").prop("handleVerUserList")();
        expect(setVerifiedUsersMock).toHaveBeenCalled();
    });

    test("change tab function test", () => {
        act(() => {
            wrapper.find("ForwardRef(Tabs)").prop("onChange")({event:""}, 2);
        });
        wrapper.update();
        expect(wrapper.find("ForwardRef(Tabs)").prop("value")).toEqual(2);
    });


    afterAll(() => {
        jest.restoreAllMocks();
    });
});


describe("tab panel tests", () => {

    test("snapshot test for tab panel", async () => {
        wrapper = shallow(<TabPanel index={2} value={2}/>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

});



describe("useEffect test", () => {
    let useEffectMock;

    /*const mockUseEffect = () => {
        useEffectMock.mockImplementationOnce(f => f());
    }

    beforeEach(() => {
        getConfigDataMock.mockImplementation(() => {
            return new Promise<ConfigData>(resolve => {});
        });

        getAdminLoginStateMock.mockImplementation(() => {
            return new Promise<void>( resolve => resolve());
        });

        getWidgetDataListMock.mockImplementation(() => {
            return new Promise<WidgetData[]>(resolve => {});
        });

        getVerifiedUsers.mockImplementation(() => {
            return new Promise<VerifiedUser[]>(resolve => {});
        })

        useEffectMock = jest.spyOn(React, "useEffect");
        mockUseEffect();

        wrapper =  shallow(<ConfigWebsite initialLogInStatus={true}/>);
    })*/

    test("useEffect function test",  () => {
        const getConfigDataMock = jest.spyOn(DesignConfigPersistence.prototype, "getConfigData");
        const getAdminLoginStateMock = jest.spyOn(AdminStatePersistence.prototype, "getAdminLoginState");
        const getWidgetDataListMock = jest.spyOn(WidgetPersistence.prototype, "getWidgetDataList");
        const getVerifiedUsers = jest.spyOn(AnnouncementPersistence.getInstance(), "getVerifiedUsers");
        const testWidgetData : WidgetData = {widgetId: "tram-schedule", location: 2, rawConfig: undefined,};
        const testConfigData : ConfigData = {fontSize: "small", colorScheme: "light", background: ""};

        getAdminLoginStateMock.mockImplementation(() => {
            return new Promise<void>( resolve => resolve());
        });

        getConfigDataMock.mockImplementation(() => {
            return new Promise<ConfigData>(resolve => {resolve(testConfigData)});
        });

        getWidgetDataListMock.mockImplementation(() => {
            return new Promise<WidgetData[]>(resolve => {resolve([testWidgetData])});
        });

        getVerifiedUsers.mockImplementation(() => {
            return new Promise<VerifiedUser[]>(resolve => {resolve([])});
        })
        useEffectMock = jest.spyOn(React, "useEffect").mockImplementationOnce(f => f());

        wrapper =  shallow(<ConfigWebsite initialLogInStatus={true}/>);


        expect(useEffectMock).toHaveBeenCalled();
        //expect(getConfigDataMock).toHaveBeenCalled();
    })

    afterAll(() => {
        jest.restoreAllMocks();
    });

});

