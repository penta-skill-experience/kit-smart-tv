import {shallow, configure} from "enzyme";
import {AdminPage} from "../../../../client/config_website/AdminPage";
import React from "react";
import toJson from "enzyme-to-json";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({adapter: new Adapter()});

const handlePasswordThenMock = jest.fn(() => Promise.resolve(true));
const handlePasswordCatchMock = jest.fn(() => Promise.resolve(false));

describe("Admin page tests", () => {
    let wrapper;
    const method = () => {};

    beforeEach(()=>{
        wrapper =  shallow(
            <AdminPage
                oldPassword={''}
                newPassword={''}
                handleOldPassword={method}
                handleNewPassword={method}
                handlePasswordChange={handlePasswordThenMock}
                handleLogOut={method}
            >
            </AdminPage>
        );
    });


    test("snapshot test for personalisation page", async () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    test("handleShowOldPassword test", () => {
        //expect(wrapper.find("ForwardRef(Input)").at(0).prop("type")).toEqual("password");
        const iconButtonComponent = shallow(wrapper.find("ForwardRef(Input)").at(0).prop("endAdornment"));
        iconButtonComponent.find("ForwardRef(IconButton)").simulate("click");
        expect(wrapper.find("ForwardRef(Input)").at(0).prop("type")).toEqual("text");
    });

    test("handleShowNewPassword test", () => {
        const iconButtonComponent = shallow(wrapper.find("ForwardRef(Input)").at(1).prop("endAdornment"));
        iconButtonComponent.find("ForwardRef(IconButton)").simulate("click");
        expect(wrapper.find("ForwardRef(Input)").at(1).prop("type")).toEqual("text");
    });

    test("successful bar test", () => {
        wrapper.find("ForwardRef(Button)").at(0).simulate("click");
        expect(handlePasswordThenMock).toHaveBeenCalled();
    });

    test("empty error bar test", () => {
        let specialWrapper = shallow(
            <AdminPage
                oldPassword={''}
                newPassword={''}
                handleOldPassword={method}
                handleNewPassword={method}
                handlePasswordChange={handlePasswordCatchMock}
                handleLogOut={method}
            >
            </AdminPage>
        );
        specialWrapper.find("ForwardRef(Button)").at(0).simulate("click");
        expect(handlePasswordCatchMock).toHaveBeenCalled();
    });

    test("error bar test", () => {
        let specialWrapper = shallow(
            <AdminPage
                oldPassword={'the'}
                newPassword={'password'}
                handleOldPassword={method}
                handleNewPassword={method}
                handlePasswordChange={handlePasswordCatchMock}
                handleLogOut={method}
            >
            </AdminPage>
        );
        specialWrapper.find("ForwardRef(Button)").at(0).simulate("click");
        expect(handlePasswordCatchMock).toHaveBeenCalled();
    });

    test("handleClose function test", () => {
        wrapper.find("ForwardRef(Snackbar)").at(0).simulate("close");
        expect(wrapper.find("ForwardRef(Snackbar)").at(0).prop("open")).toEqual(false);
    });

    test("handleClose function if case test", () => {
        wrapper.find("ForwardRef(Snackbar)").at(0).simulate("close", { target: { reason: 'clickaway'} });
        expect(wrapper.find("ForwardRef(Snackbar)").at(0).prop("open")).toEqual(false);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
});