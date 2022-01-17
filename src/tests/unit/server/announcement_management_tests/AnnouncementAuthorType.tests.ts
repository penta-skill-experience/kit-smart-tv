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

    const verifiedUser1 = new VerifiedUser("verifieduser1@testing.com", "verified");
    const verifiedUser2 = new VerifiedUser("bob.smith@example.com", "bob");
    const verifiedUser3 = new VerifiedUser("alice.smith@example.com","alice");

    const unverifiedUserEmail1 = "unverifieduser@example.com";
    const unverifiedUserEmail2 = "anotherunverifiedUser@example.com";

    // mocking getVerifiedUsers from AnnouncementPersistence
    const mockedGetVerifiedUsers = jest.spyOn(announcementPersistence, "getVerifiedUsers");
    mockedGetVerifiedUsers.mockImplementation(() => {
        return [verifiedUser1, verifiedUser2, verifiedUser3];
    });

    test("test ADMIN identifies correct admins", () => {
        expect(AnnouncementAuthorType.ADMIN.isThisAuthorType(AnnouncementConfig.ADMINS[0].IDENTIFIER)).toBe(true);
        expect(AnnouncementAuthorType.ADMIN.isThisAuthorType(AnnouncementConfig.ADMINS[1].IDENTIFIER)).toBe(true);
        expect(AnnouncementAuthorType.ADMIN.isThisAuthorType("notAnAdmin@example.com")).toBe(false);
    })

    test("test VERIFIED identifies verified users correctly", () => {
        expect(AnnouncementAuthorType.VERIFIED.isThisAuthorType(verifiedUser1.email)).toBe(true);
        expect(AnnouncementAuthorType.VERIFIED.isThisAuthorType(verifiedUser2.email)).toBe(true);
        expect(AnnouncementAuthorType.VERIFIED.isThisAuthorType(verifiedUser3.email)).toBe(true);

        expect(AnnouncementAuthorType.VERIFIED.isThisAuthorType(unverifiedUserEmail1)).toBe(false);
        expect(AnnouncementAuthorType.VERIFIED.isThisAuthorType(unverifiedUserEmail2)).toBe(false);
    })

    test("test UNVERIFIED identifies unverified users correctly", () => {
        expect(AnnouncementAuthorType.UNVERIFIED.isThisAuthorType(verifiedUser1.email)).toBe(false);
        expect(AnnouncementAuthorType.UNVERIFIED.isThisAuthorType(verifiedUser2.email)).toBe(false);
        expect(AnnouncementAuthorType.UNVERIFIED.isThisAuthorType(verifiedUser3.email)).toBe(false);

        expect(AnnouncementAuthorType.UNVERIFIED.isThisAuthorType(unverifiedUserEmail1)).toBe(true);
        expect(AnnouncementAuthorType.UNVERIFIED.isThisAuthorType(unverifiedUserEmail2)).toBe(true);

        // UNVERIFIED.isThisAuthorType also should return false if the given author is an admin but not a verified user
        expect(AnnouncementAuthorType.UNVERIFIED.isThisAuthorType(AnnouncementConfig.ADMINS[0].IDENTIFIER)).toBe(false);
        expect(AnnouncementAuthorType.UNVERIFIED.isThisAuthorType(AnnouncementConfig.ADMINS[1].IDENTIFIER)).toBe(false);
    })

    afterAll(() => {
        jest.restoreAllMocks();
    })
})