import * as AnnouncementConfig from "../../../../server/announcement_management/AnnouncementConfig.json";
import {VerifiedUser} from "../../../../shared/values/VerifiedUser";
import {AnnouncementAuthorType} from "../../../../server/announcement_management/AnnouncementAuthorType";

// mocking AnnouncementConfig.json
jest.mock('../../../../server/announcement_management/AnnouncementConfig.json', () => ({

    "DEFAULT_ANNOUNCEMENT_TIMEOUT": "1210000000",
    "ADMINS": [{
        "EMAIL": "admin1@example.com"
    },
        {
            "EMAIL": "anotheradmin@example.com"
        }]

}), {virtual: true});

describe("testing AnnouncementAuthorType.ts", () => {

    const verifiedUser1 = new VerifiedUser("verifieduser1@testing.com", "verified");
    const verifiedUser2 = new VerifiedUser("bob.smith@example.com", "bob");
    const verifiedUser3 = new VerifiedUser("alice.smith@example.com","alice");
    const verifiedUsers = [verifiedUser1, verifiedUser2, verifiedUser3]

    const unverifiedUserEmail1 = "unverifieduser@example.com";
    const unverifiedUserEmail2 = "anotherunverifiedUser@example.com";

    test("test ADMIN identifies correct admins", () => {
        expect(AnnouncementAuthorType.ADMIN.isThisAuthorType(AnnouncementConfig.ADMINS[0].EMAIL, verifiedUsers))
            .toBe(true);

        expect(AnnouncementAuthorType.ADMIN.isThisAuthorType(AnnouncementConfig.ADMINS[1].EMAIL, verifiedUsers))
            .toBe(true);

        expect(AnnouncementAuthorType.ADMIN.isThisAuthorType("notAnAdmin@example.com", verifiedUsers))
            .toBe(false);
    });

    test("test VERIFIED identifies verified users correctly", () => {
        expect(AnnouncementAuthorType.VERIFIED.isThisAuthorType(verifiedUser1.email, verifiedUsers))
            .toBe(true);

        expect(AnnouncementAuthorType.VERIFIED.isThisAuthorType(verifiedUser2.email, verifiedUsers))
            .toBe(true);

        expect(AnnouncementAuthorType.VERIFIED.isThisAuthorType(verifiedUser3.email, verifiedUsers))
            .toBe(true);

        expect(AnnouncementAuthorType.VERIFIED.isThisAuthorType(unverifiedUserEmail1, verifiedUsers))
            .toBe(false);

        expect(AnnouncementAuthorType.VERIFIED.isThisAuthorType(unverifiedUserEmail2, verifiedUsers))
            .toBe(false);
    })

    test("test UNVERIFIED identifies unverified users correctly", () => {
        expect(AnnouncementAuthorType.UNVERIFIED.isThisAuthorType(verifiedUser1.email, verifiedUsers))
            .toBe(false);

        expect(AnnouncementAuthorType.UNVERIFIED.isThisAuthorType(verifiedUser2.email, verifiedUsers))
            .toBe(false);

        expect(AnnouncementAuthorType.UNVERIFIED.isThisAuthorType(verifiedUser3.email, verifiedUsers))
            .toBe(false);

        expect(AnnouncementAuthorType.UNVERIFIED.isThisAuthorType(unverifiedUserEmail1, verifiedUsers))
            .toBe(true);

        expect(AnnouncementAuthorType.UNVERIFIED.isThisAuthorType(unverifiedUserEmail1, verifiedUsers))
            .toBe(true);

        // UNVERIFIED.isThisAuthorType also should return false if the given author is an admin but not a verified user
        expect(AnnouncementAuthorType.UNVERIFIED.isThisAuthorType(AnnouncementConfig.ADMINS[0].EMAIL, verifiedUsers))
            .toBe(false);

        expect(AnnouncementAuthorType.UNVERIFIED.isThisAuthorType(AnnouncementConfig.ADMINS[1].EMAIL, verifiedUsers))
            .toBe(false);
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });
});