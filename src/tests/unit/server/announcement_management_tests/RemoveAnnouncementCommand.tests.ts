import * as AnnouncementConfig from "../../../../server/announcement_management/AnnouncementConfig.json";
import {VerifiedUser} from "../../../../shared/values/VerifiedUser";
import {AnnouncementPersistence} from "../../../../shared/persistence/AnnouncementPersistence";
import {Announcement} from "../../../../server/announcement_management/Announcement";
import {RemoveAnnouncementCommand} from "../../../../server/announcement_management/RemoveAnnouncementCommand";
import {AnnouncementCommandError} from "../../../../server/announcement_management/AnnouncementCommand";

// mocking AnnouncementConfig.json
jest.mock('../../../../server/announcement_management/AnnouncementConfig.json', () => ({

    "DEFAULT_ANNOUNCEMENT_TIMEOUT": "1210000000",
    "ADMINS": [{
        "EMAIL": "admin1@example.com"
    }]

}), {virtual: true});

// setting up test values
const bob = new VerifiedUser("bob@example.com", "bob");
const alice = new VerifiedUser("alice@example.com", "alice");
const verifiedUsers = [bob, alice];
const unverifiedUserEmail = "unverifieduser@example.com";

const bobAnnouncement = new Announcement("Bobs Announcement", bob.email, "This is bobs announcement.");
const aliceAnnouncement = new Announcement(
    "Announcement from alice", alice.email, "This announcement is from alice");
const announcements = [bobAnnouncement, aliceAnnouncement];
let setAnnouncements : Announcement[] = [];

//mocking announcementPersistence to return test values for these tests
const getAnnouncementsMock = jest.spyOn(AnnouncementPersistence.prototype, "getAnnouncements");
const getVerifiedUsersMock = jest.spyOn(AnnouncementPersistence.prototype, "getVerifiedUsers");
const setAnnouncementsMock = jest.spyOn(AnnouncementPersistence.prototype, "setAnnouncements");

const removeAnnouncementText = "";

getAnnouncementsMock.mockImplementation(() => {
    return announcements;
});
getVerifiedUsersMock.mockImplementation(() => {
    return verifiedUsers;
});
setAnnouncementsMock.mockImplementation(announcementsToSet => {
    setAnnouncements = announcementsToSet;
});

afterEach(() => {
    setAnnouncements = [];
})

afterAll(() => {
    jest.restoreAllMocks();
})


/*
test verified user attempts to remove his own
test verified user attempts to remove from someone else

admin can remove any announcement

unverified user attempts to remove announcement
 */

describe("testing RemoveAnnouncementCommand handles unverified users correctly", () => {

    test("unverified user cannot remove an announcement", () => {
        const removeBobsAnnouncement = new Announcement(bobAnnouncement.title,
            unverifiedUserEmail, removeAnnouncementText);

        expect(() => {
            new RemoveAnnouncementCommand(removeBobsAnnouncement).executeCommand()
        }).toThrow(AnnouncementCommandError);
        expect(setAnnouncements.length).toEqual(0);
    });
});

describe("testing RemoveAnnouncementCommand handles verified users correctly", () => {

    test("verified user can remove his own announcement", () => {
        const removeAliceAnnouncement = new Announcement(aliceAnnouncement.title, alice.email,
            removeAnnouncementText);

        new RemoveAnnouncementCommand(removeAliceAnnouncement).executeCommand();

        expect(setAnnouncements.includes(bobAnnouncement)).toBe(true);
        expect(setAnnouncements.length).toEqual(1);
    });

    test("verified user cannot remove announcement from other author", () => {
        const removeAliceAnnouncement = new Announcement(aliceAnnouncement.title, bob.email,
            removeAnnouncementText);

        expect(() => {
            new RemoveAnnouncementCommand(removeAliceAnnouncement).executeCommand();
        }).toThrow(AnnouncementCommandError);
        expect(setAnnouncements.length).toEqual(0);
    });
});

describe("testing RemoveAnnouncementCommand handles admin correctly", () => {

    test("admin can remove any announcement", () => {
        const removeAliceAnnouncement = new Announcement(aliceAnnouncement.title, AnnouncementConfig.ADMINS[0].EMAIL,
            removeAnnouncementText);

        new RemoveAnnouncementCommand(removeAliceAnnouncement).executeCommand();

        expect(setAnnouncements.includes(bobAnnouncement)).toBe(true);
        expect(setAnnouncements.length).toEqual(1);
    });
});

describe("miscellaneous", () => {

    test("attempting to remove a non existing announcement does nothing", () => {
        const nonExistingAnnouncement = new Announcement("not existing", bob.email,
            "text of not existing announcement");

        new RemoveAnnouncementCommand(nonExistingAnnouncement).executeCommand();

        expect(setAnnouncements.length).toEqual(0);
    })
})

