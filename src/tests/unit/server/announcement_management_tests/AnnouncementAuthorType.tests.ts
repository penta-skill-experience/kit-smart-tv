import * as AnnouncementConfig from "../../../../server/announcement_management/AnnouncementConfig.json";
import {AnnouncementPersistence} from "../../../../shared/persistence/AnnouncementPersistence";
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

    const unverifiedUserEmail1 = "unverifieduser@example.com";
    const unverifiedUserEmail2 = "anotherunverifiedUser@example.com";

    // mocking getVerifiedUsers from AnnouncementPersistence
    const mockedGetVerifiedUsers = jest.spyOn(AnnouncementPersistence.prototype, "getVerifiedUsers");
    mockedGetVerifiedUsers.mockImplementation(() => {
        return new Promise<VerifiedUser[]>(resolve => {
            resolve([verifiedUser1, verifiedUser2, verifiedUser3]);
        });
    });

    test("test ADMIN identifies correct admins", () => {
        AnnouncementAuthorType.ADMIN.isThisAuthorType(AnnouncementConfig.ADMINS[0].EMAIL).then(result => {
            expect(result).toBe(true);
        });
        AnnouncementAuthorType.ADMIN.isThisAuthorType(AnnouncementConfig.ADMINS[1].EMAIL).then(result => {
            expect(result).toBe(true);
        });
        AnnouncementAuthorType.ADMIN.isThisAuthorType("notAnAdmin@example.com").then(result => {
            expect(result).toBe(false);
        });
    });

    test("test VERIFIED identifies verified users correctly", () => {
        AnnouncementAuthorType.VERIFIED.isThisAuthorType(verifiedUser1.email).then(result => {
            expect(result).toBe(true);
        });
        AnnouncementAuthorType.VERIFIED.isThisAuthorType(verifiedUser2.email).then(result => {
            expect(result).toBe(true);
        });
        AnnouncementAuthorType.VERIFIED.isThisAuthorType(verifiedUser3.email).then(result => {
            expect(result).toBe(true);
        });

        AnnouncementAuthorType.VERIFIED.isThisAuthorType(unverifiedUserEmail1).then(result => {
            expect(result).toBe(false);
        });
        AnnouncementAuthorType.VERIFIED.isThisAuthorType(unverifiedUserEmail2).then(result => {
            expect(result).toBe(false);
        });
    })

    test("test UNVERIFIED identifies unverified users correctly", () => {
        AnnouncementAuthorType.UNVERIFIED.isThisAuthorType(verifiedUser1.email).then(result => {
            expect(result).toBe(false);
        });
        AnnouncementAuthorType.UNVERIFIED.isThisAuthorType(verifiedUser2.email).then(result => {
            expect(result).toBe(false);
        });
        AnnouncementAuthorType.UNVERIFIED.isThisAuthorType(verifiedUser3.email).then(result => {
            expect(result).toBe(false);
        });

        AnnouncementAuthorType.UNVERIFIED.isThisAuthorType(unverifiedUserEmail1).then(result => {
            expect(result).toBe(true);
        });
        AnnouncementAuthorType.UNVERIFIED.isThisAuthorType(unverifiedUserEmail2).then(result => {
            expect(result).toBe(true);
        });

        // UNVERIFIED.isThisAuthorType also should return false if the given author is an admin but not a verified user
        AnnouncementAuthorType.UNVERIFIED.isThisAuthorType(AnnouncementConfig.ADMINS[0].EMAIL).then(result => {
            expect(result).toBe(false);
        });
        AnnouncementAuthorType.UNVERIFIED.isThisAuthorType(AnnouncementConfig.ADMINS[1].EMAIL).then(result => {
            expect(result).toBe(false);
        });
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });
});