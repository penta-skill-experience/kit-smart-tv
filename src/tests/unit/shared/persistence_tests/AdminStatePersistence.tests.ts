import fetchMock from "jest-fetch-mock";
import {AdminStatePersistence} from "../../../../shared/persistence/AdminStatePersistence";
fetchMock.enableMocks();

global.Headers = class {
    constructor() {};

    append(var1 : string, var2 : string) {};
} as jest.Mock;

const responseMock = jest.spyOn(Response.prototype, "json");

describe("AdminStatePersistence tests", () => {
    test("testing login successful", async () => {
        const newAccessToken = "accessToken";
        const newRefreshToken = "refreshToken";

        fetchMock.mockResponse(JSON.stringify(
            {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken
            }
        ));

        await new AdminStatePersistence().login("");
        expect(sessionStorage.__STORE__["accessToken"]).toEqual(newAccessToken);
        expect(sessionStorage.__STORE__["refreshToken"]).toEqual(newRefreshToken);
        expect(Object.keys(sessionStorage.__STORE__).length).toBe(2);
    });

    test("testing logout successful", async () => {
        sessionStorage.setItem("accessToken", "");
        sessionStorage.setItem("refreshToken", "");

        fetchMock.mockResponse(JSON.stringify({
            accessToken: null,
            refreshToken: null
        }));

        await new AdminStatePersistence().logout();
        expect(Object.keys(sessionStorage.__STORE__).length).toBe(0);
    });

    test("testing getAdminLoginState successful", async () => {
        jest.useFakeTimers().setSystemTime(new Date("2022-01-01"));
        const dateUntilValid = new Date("2022-01-02");

        fetchMock.mockResponse(JSON.stringify({
            valid_until: dateUntilValid
        }));

        new AdminStatePersistence().getAdminLoginState().then(() => {})
            .catch(() => {throw new Error("getAdminLoginState rejected for valid valid_until")});
    });

    test("testing setPassword successful", () => {
        fetchMock.mockResponse(JSON.stringify({
            status: 200
        }));

        new AdminStatePersistence().setPassword("oldpw", "newpw").then(() => {})
            .catch(() => {throw new Error("setPassword rejected when status was 200")});
    });

    test("login rejects if fetch failed", () => {
        fetchMock.mockReject(new Error());

        new AdminStatePersistence().login("").then(() => {throw new Error("login didn't reject when fetch failed")})
            .catch(() => {});
    });

    test("logout rejects if fetch failed", () => {
        fetchMock.mockReject(new Error());

        new AdminStatePersistence().logout().then(() => {throw new Error("logout didn't reject when fetch failed")})
            .catch(() => {});
    });

    test("getAdminLoginState rejects if fetch failed", () => {
        fetchMock.mockReject(new Error());

        new AdminStatePersistence().getAdminLoginState().then(() => {throw new Error("getAdminLoginState didn't reject when fetch failed")})
            .catch(() => {});
    });

    test("setPassword rejects if fetch failed", () => {
        fetchMock.mockReject(new Error());

        new AdminStatePersistence().setPassword("", "").then(() => {throw new Error("setPassword didn't reject when fetch failed")})
            .catch(() => {});
    });

    test("login rejects if the fetch response could not be parsed to json", () => {
        responseMock.mockImplementation(() => {
            return new Promise((resolve, reject) => reject());
        });
        fetchMock.mockResponse(JSON.stringify({}));

        new AdminStatePersistence().login("").then(() => {throw new Error("login didn't reject when fetch response could not be parsed to json")})
            .catch(() => {});
    });

    test("logout rejects if the fetch response could not be parsed to json", () => {
        responseMock.mockImplementation(() => {
            return new Promise((resolve, reject) => reject());
        });
        fetchMock.mockResponse(JSON.stringify({status: 200}));

        new AdminStatePersistence().logout().then(() => {throw new Error("logout didn't reject when fetch response could not be parsed to json")})
            .catch(() => {});
    });

    test("getAdminLoginState rejects if the fetch response could not be parsed to json", () => {
        responseMock.mockImplementation(() => {
            return new Promise((resolve, reject) => reject());
        });
        fetchMock.mockResponse(JSON.stringify({}));

        new AdminStatePersistence().getAdminLoginState().then(() => {throw new Error("getAdminLoginState didn't reject when fetch response could not be parsed to json")})
            .catch(() => {});
    });

    test("setPassword rejects if the fetch response could not be parsed to json", () => {
        fetchMock.mockResponse(JSON.stringify({}));
        responseMock.mockImplementation(() => {
            return new Promise((resolve, reject) => reject());
        });

        new AdminStatePersistence().setPassword("", "").then(() => {throw new Error("setPassword didn't reject when fetch response could not be parsed to json")})
            .catch(() => {});
    });

    test("logout fails if accessToken and refreshToken are null", () => {
         fetchMock.mockResponse(JSON.stringify({
             accessToken: null,
             refreshToken: null
         }));

         new AdminStatePersistence().logout().then(() => {throw new Error("login didnt reject when accessToken and refreshToken in the response were null")})
             .catch(() => {});
    });


    afterEach(() => {
        jest.restoreAllMocks();
        fetchMock.mockClear();
        jest.useRealTimers();
        sessionStorage.clear();
    });
})