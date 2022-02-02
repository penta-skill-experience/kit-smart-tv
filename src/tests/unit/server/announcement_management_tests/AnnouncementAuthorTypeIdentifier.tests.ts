import * as AnnouncementConfig from "../../../../server/announcement_management/AnnouncementConfig.json";
import {VerifiedUser} from "../../../../shared/values/VerifiedUser";
import {AnnouncementPersistence} from "../../../../shared/persistence/announcements/AnnouncementPersistence";
import {AnnouncementAuthorTypeIdentifier} from "../../../../server/announcement_management/AnnouncementAuthorTypeIdentifier";
import {AnnouncementAuthorType} from "../../../../server/announcement_management/AnnouncementAuthorType";

// mocking AnnouncementConfig.json
jest.mock('../../../../server/announcement_management/AnnouncementConfig.json', () => ({

    "DEFAULT_ANNOUNCEMENT_TIMEOUT": "1210000000",
    "ADMINS": [{
        "EMAIL": "admin1@example.com"
    }]

}), {virtual: true});

describe("testing AnnouncementAuthorTypeIdentifier", () => {

    const verifiedUser = new VerifiedUser("verifieduser1@testing.com", "verified");
    const verifiedUsers = [verifiedUser];

    const unverifiedUserEmail = "unverifieduser@example.com";


    test("AnnouncementAuthorTypeIdentifier identifies ADMIN correctly", () => {
        expect(new AnnouncementAuthorTypeIdentifier().getAuthorType(AnnouncementConfig.ADMINS[0].EMAIL, verifiedUsers))
            .toBe(AnnouncementAuthorType.ADMIN);
    });

    test("AnnouncementAuthorTypeIdentifier identifies VERIFIED correctly", () => {
        expect(new AnnouncementAuthorTypeIdentifier().getAuthorType(verifiedUser.email, verifiedUsers))
            .toBe(AnnouncementAuthorType.VERIFIED);
    });

    test("AnnouncementAuthorTypeIdentifier identifies UNVERIFIED correctly", () => {
        expect(new AnnouncementAuthorTypeIdentifier().getAuthorType(unverifiedUserEmail, verifiedUsers))
            .toBe(AnnouncementAuthorType.UNVERIFIED);
    });

    afterAll(() => {
        jest.restoreAllMocks();
    })
})