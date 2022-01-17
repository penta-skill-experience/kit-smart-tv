import * as AnnouncementConfig from "../../../../server/announcement_management/AnnouncementConfig.json";
import {AnnouncementPersistence} from "../../../../shared/persistence/AnnouncementPersistence";
import {VerifiedUser} from "../../../../shared/values/VerifiedUser";
import {AnnouncementAuthorType} from "../../../../server/announcement_management/AnnouncementAuthorType";

jest.mock('../../../../server/announcement_management/AnnouncementConfig.json', () => ({

    "DEFAULT_ANNOUNCEMENT_TIMEOUT": "1210000000",
    "ADMINS": [{
        "IDENTIFIER": "admin1@example.com"
    },
        {
            "IDENTIFIER": "anotheradmin@example.com"
        }]

}), {virtual: true});

describe("testing AnnouncementAuthorType.ts", () => {

    const announcementPersistence = new AnnouncementPersistence();

    // mocking getVerifiedUsers from AnnouncementPersistence
    const mockedGetVerifiedUsers = jest.spyOn(announcementPersistence, "getVerifiedUsers");
    mockedGetVerifiedUsers.mockImplementation(() => {
        return [new VerifiedUser("verifieduser1@testing.com", "verified"),
                new VerifiedUser("bob.smith@example.com", "bob"),
                new VerifiedUser("alice.smith@example.com","alice")];
    });

    test("test ADMIN identifies correct admins", () => {
        expect(AnnouncementAuthorType.ADMIN.isThisAuthorType(AnnouncementConfig.ADMINS[0].IDENTIFIER)).toBe(true);
        expect(AnnouncementAuthorType.ADMIN.isThisAuthorType(AnnouncementConfig.ADMINS[1].IDENTIFIER)).toBe(true);
        expect(AnnouncementAuthorType.ADMIN.isThisAuthorType("notAnAdmin@example.com")).toBe(false);
    })

    afterAll(() => {
        jest.restoreAllMocks();
    })
})