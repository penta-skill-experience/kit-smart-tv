import {
    AnnouncementPersistenceFrontend
} from "../../../../shared/persistence/announcements/AnnouncementPersistenceFrontend";
import fetchMock from "jest-fetch-mock";
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

    afterEach(() => {
       jest.restoreAllMocks();
   });
});