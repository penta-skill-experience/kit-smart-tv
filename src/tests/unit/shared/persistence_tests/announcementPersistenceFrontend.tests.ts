import {
    AnnouncementPersistenceFrontend
} from "../../../../shared/persistence/announcements/AnnouncementPersistenceFrontend";
import fetchMock from "jest-fetch-mock";
import {toNumber} from "lodash";
import {newAnnouncement} from "../../server/util/newAnnouncement";
import {VerifiedUser} from "../../../../shared/values/VerifiedUser";
import {IVerifiedUser} from "../../../../shared/values/IVerifiedUser";
fetchMock.enableMocks();

global.Headers = class {
    constructor() {};

    append(var1 : string, var2 : string) {};
} as jest.Mock;


describe("announcementPersistenceFrontend tests", () => {

    test("testing getVerifiedUsers", async () => {
        fetchMock.mockResponse(JSON.stringify([
                {
                    email: "tom-mohr@gmx.de",
                    name: "Tom Mohr"
                },
                {
                    email: "aaron@familie-siefker.de",
                    name: "Aaron Siefker"
                }
            ]
        ));

        new AnnouncementPersistenceFrontend().getVerifiedUsers().then(verifiedUsers => {
            expect(verifiedUsers[0].email).toEqual("tom-mohr@gmx.de");
            expect(verifiedUsers[0].name).toEqual("Tom Mohr");
            expect(verifiedUsers[1].email).toEqual("aaron@familie-siefker.de");
            expect(verifiedUsers[1].name).toEqual("Aaron Siefker");
            expect(verifiedUsers.length).toEqual(2);
        });
    });

    test(" testing getAnnouncements", async () => {
        const titleValue = "Hello";
        const textValue = "Hello World";
        const authorValue = "bob.smith@example.com";
        const timeoutValue = 1645120728243;
        const timeOfAdditionValue = 1643910728243;
        fetchMock.mockResponse(JSON.stringify([
            {
                title: titleValue,
                text: textValue,
                author: authorValue,
                timeout: timeoutValue,
                timeOfAddition: timeOfAdditionValue
            }
            ]
        ));
        jest.useFakeTimers().setSystemTime(new Date("2022-01-01"));

        const announcements = await new AnnouncementPersistenceFrontend().getAnnouncements();
        expect(announcements[0].title).toEqual(titleValue);
        expect(announcements[0].text).toEqual(textValue);
        expect(announcements[0].author).toEqual(authorValue);
        expect(announcements[0].timeout).toEqual(timeoutValue);
        expect(announcements[0].timeOfAddition).toEqual(timeOfAdditionValue);
    });

    test("testing setAnnouncements", async () => {
        const announcements = [newAnnouncement("Hello", "bob.smith@example.com", "Hello World",0)];
        const body = {announcementDataList: announcements};
        fetchMock.mockResponse(JSON.stringify({status: 200}));

        await new AnnouncementPersistenceFrontend().setAnnouncements(announcements);

        expect(fetchMock.mock.calls.length).toEqual(1);
        expect(fetchMock.mock.calls[0][1].method).toEqual("PUT");
        expect(fetchMock.mock.calls[0][1].body).toEqual(JSON.stringify(body));
    });

    test("testing setVerifiedUsers", async () => {
        const verifiedUsers = [new VerifiedUser("bob.smith@example.com", "Bob Smith")];
        const body: IVerifiedUser[] = verifiedUsers.map(user => ({
            email: user.email,
            name: user.name,
        }));

        fetchMock.mockResponse(JSON.stringify({status: 200}));

        await new AnnouncementPersistenceFrontend().setVerifiedUsers(verifiedUsers);

        expect(fetchMock.mock.calls.length).toEqual(1);
        expect(fetchMock.mock.calls[0][1].method).toEqual("PUT");
        expect(fetchMock.mock.calls[0][1].body).toEqual(JSON.stringify(body));
    });

    afterEach(() => {
       jest.restoreAllMocks();
       fetchMock.mockClear();
       jest.useRealTimers();
   });
});