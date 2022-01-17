import * as AnnouncementConfig from "../../../../server/announcement_management/AnnouncementConfig.json";

// mocking AnnouncementConfig.json
import {VerifiedUser} from "../../../../shared/values/VerifiedUser";
import {AnnouncementPersistence} from "../../../../shared/persistence/AnnouncementPersistence";
import {
    AnnouncementAuthorTypeIdentifier
} from "../../../../server/announcement_management/AnnouncementAuthorTypeIdentifier";
import {AnnouncementAuthorType} from "../../../../server/announcement_management/AnnouncementAuthorType";

jest.mock('../../../../server/announcement_management/AnnouncementConfig.json', () => ({

    "DEFAULT_ANNOUNCEMENT_TIMEOUT": "1210000000",
    "ADMINS": [{
        "EMAIL": "admin1@example.com"
    }]

}), {virtual: true});

describe("testing AnnouncementAuthorTypeIdentifier", () => {

    const verifiedUser = new VerifiedUser("verifieduser1@testing.com", "verified");

    const unverifiedUserEmail = "unverifieduser@example.com";

    // mocking getVerifiedUsers from AnnouncementPersistence
    const mockedGetVerifiedUsers = jest.spyOn(AnnouncementPersistence.prototype, "getVerifiedUsers");
    mockedGetVerifiedUsers.mockImplementation(() => {
        return [verifiedUser];
    });

    test("AnnouncementAuthorTypeIdentifier identifies ADMIN correctly", () => {
        expect(new AnnouncementAuthorTypeIdentifier().getAuthorType(AnnouncementConfig.ADMINS[0].EMAIL))
            .toBe(AnnouncementAuthorType.ADMIN);
    });

    test("AnnouncementAuthorTypeIdentifier identifies VERIFIED correctly", () => {
        expect(new AnnouncementAuthorTypeIdentifier().getAuthorType(verifiedUser.email))
            .toBe(AnnouncementAuthorType.VERIFIED);
    });

    test("AnnouncementAuthorTypeIdentifier identifies UNVERIFIED correctly", () => {
        expect(new AnnouncementAuthorTypeIdentifier().getAuthorType(unverifiedUserEmail))
            .toBe(AnnouncementAuthorType.UNVERIFIED);
    });
})