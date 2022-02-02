import * as AnnouncementConfig from "../../../../server/announcement_management/AnnouncementConfig.json";
import {VerifiedUser} from "../../../../shared/values/VerifiedUser";
import {AnnouncementPersistence} from "../../../../shared/persistence/announcements/AnnouncementPersistence";
import {SetAnnouncementCommand} from "../../../../server/announcement_management/SetAnnouncementCommand";
import {
    AnnouncementCommandError,
    IllegalAnnouncementTextForCommandError
} from "../../../../server/announcement_management/AnnouncementCommand";
import {newAnnouncement} from "../util/newAnnouncement";
import {Announcement} from "../../../../shared/values/Announcement";

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

const bobAnnouncement = newAnnouncement("Bobs Announcement", bob.email, "This is bobs announcement.");
const aliceAnnouncement = newAnnouncement(
    "Announcement from alice", alice.email, "This announcement is from alice");
const announcements = [bobAnnouncement, aliceAnnouncement];
let setAnnouncements: Announcement[] = [];

//mocking announcementPersistence to return test values for these tests
const getAnnouncementsMock = jest.spyOn(AnnouncementPersistence.prototype, "getAnnouncements");
const getVerifiedUsersMock = jest.spyOn(AnnouncementPersistence.prototype, "getVerifiedUsers");
const setAnnouncementsMock = jest.spyOn(AnnouncementPersistence.prototype, "setAnnouncements");

getAnnouncementsMock.mockImplementation(() => {
    return new Promise<Announcement[]>(resolve => {
        resolve(announcements);
    });
});
getVerifiedUsersMock.mockImplementation(() => {
    return new Promise<VerifiedUser[]>(resolve => {
        resolve(verifiedUsers);
    });
});

setAnnouncementsMock.mockImplementation(announcementsToSet => {
    setAnnouncements = announcementsToSet;
    return new Promise<void>(resolve => {
        resolve();
    });
});


afterEach(() => {
    setAnnouncements = [];
})

afterAll(() => {
    jest.restoreAllMocks();
})

describe("SetAnnouncementCommand.ts handles verified users correctly", () => {

    test("verified user can add announcement", () => {

        const newAnn = newAnnouncement("Another Announcement from Bob",
            bob.email, "This is another announcement from Bob")

        new SetAnnouncementCommand(newAnn).executeCommand().then(() => {
            expect(setAnnouncements.includes(bobAnnouncement)).toBe(true);
            expect(setAnnouncements.includes(aliceAnnouncement)).toBe(true);
            expect(setAnnouncements.includes(newAnn)).toBe(true);
            expect(setAnnouncements.length).toEqual(3);
        });
    });

    test("verified user can edit his own announcement", () => {
        const updatedBobAnnouncement = newAnnouncement(bobAnnouncement.title, bob.email,
            "This is bobs updated announcement");

        new SetAnnouncementCommand(updatedBobAnnouncement).executeCommand().then(() => {
            expect(setAnnouncements.includes(updatedBobAnnouncement)).toBe(true);
            expect(setAnnouncements.includes(aliceAnnouncement)).toBe(true);
            expect(setAnnouncements.length).toEqual(2);
        });
    });

    test ("verified user cannot edit announcements from others", () => {
        const bobUpdatesAliceAnnouncement = newAnnouncement(aliceAnnouncement.title, bob.email,
            "This announcement from alice was updated by bob.");

        expect(new SetAnnouncementCommand(bobUpdatesAliceAnnouncement).executeCommand())
            .rejects.toBeInstanceOf(AnnouncementCommandError);
    });

    test("an announcement with an empty text cannot be added", () => {
        expect(() => {
            new SetAnnouncementCommand(newAnnouncement("title", bob.email, ""));
        }).toThrow(IllegalAnnouncementTextForCommandError);
    })
});

describe("SetAnnouncementCommand.ts handles unverified users correctly", () => {
    const unverifiedUserEmail = "unverifieduser@example.com";

    test("an unverified user cannot add an announcement", () => {
        const newAnn = newAnnouncement("new Announcement", unverifiedUserEmail,
            "This is a new announcement");

        expect(new SetAnnouncementCommand(newAnn).executeCommand())
            .rejects.toBeInstanceOf(AnnouncementCommandError);
    });

    test("an unverified user cannot edit an existing announcement", () => {
        const editedAnnouncementByUnverified = newAnnouncement(bobAnnouncement.title, unverifiedUserEmail,
            "This Announcement was edited by an unverified user");

        expect(new SetAnnouncementCommand(editedAnnouncementByUnverified).executeCommand())
            .rejects.toBeInstanceOf(AnnouncementCommandError);
    });
});

describe("SetAnnouncementCommand.ts handles admins correctly", () => {

    test("an admin can add an announcement", () => {
        const announcementFromAdmin = newAnnouncement("Announcement from an admin", AnnouncementConfig.ADMINS[0].EMAIL,
            "The text of the announcement from an admin");

        return new SetAnnouncementCommand(announcementFromAdmin).executeCommand().then(() => {
            expect(setAnnouncements.includes(bobAnnouncement)).toBe(true);
            expect(setAnnouncements.includes(aliceAnnouncement)).toBe(true);
            expect(setAnnouncements.includes(announcementFromAdmin)).toBe(true);
            expect(setAnnouncements.length).toEqual(3);
        });
    });

    test("an admin can edit any announcement", () => {

        const updatedAliceAnnouncementByAdmin = newAnnouncement(aliceAnnouncement.title, AnnouncementConfig.ADMINS[0].EMAIL,
            "the text of alice' announcement was updated by an admin");

        return new SetAnnouncementCommand(updatedAliceAnnouncementByAdmin).executeCommand().then(() => {
            expect(setAnnouncements.includes(bobAnnouncement)).toBe(true);
            expect(setAnnouncements.includes(updatedAliceAnnouncementByAdmin)).toBe(true);
            expect(setAnnouncements.length).toEqual(2);
        });
    });
});