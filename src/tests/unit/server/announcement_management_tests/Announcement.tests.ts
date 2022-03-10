import * as AnnouncementConfig from "../../../../server/announcement_management/AnnouncementConfig.json";
import {AnnouncementAuthorError} from "../../../../server/announcement_management/AnnouncementAuthorError";
import {newAnnouncement} from "../../../../server/email_announcement_interaction/newAnnouncement";

const announcementTitle = "HelloWorld";
const announcementAuthor = "john.smith@example.com";
const announcementText = "What a wonderful world";

describe("testing new announcement for given timeOfAddition and given timeout", () => {
    const timeOfAddition = 12345
    const durationToTimeout = 5;

    const announcement = newAnnouncement(announcementTitle, announcementAuthor, announcementText,
        timeOfAddition, durationToTimeout);

    test ("testing get timeOfAddition()", () => {
        expect(announcement.timeOfAddition).toEqual(timeOfAddition);
    })

    test("testing get timeout()", () => {
        expect(announcement.timeout).toEqual(timeOfAddition + durationToTimeout);
    })
})

describe("testing getters and setters of Announcement.ts", () => {

    const announcement = newAnnouncement(announcementTitle, announcementAuthor, announcementText);

    test("testing get title()", () => {
        expect(announcement.title).toEqual(announcementTitle);
    })

    test("testing get author()", () => {
        expect(announcement.author).toEqual(announcementAuthor);
    })

    test("testing get text()", () => {
        expect(announcement.text).toEqual(announcementText);
    })

    test("testing get timeout() with default timeout", () => {
        expect(announcement.timeout).toEqual(announcement.timeOfAddition + +AnnouncementConfig.DEFAULT_ANNOUNCEMENT_TIMEOUT);
    })

    test("testing set text()", () => {
        const newText = "New text";
        announcement.text = newText;
        expect(announcement.text).toEqual(newText);
    })
})

describe("testing errors for Announcement.ts", () => {
    const invalidAuthor = "";


    test("testing error for invalid author", () => {
        expect(() => {
            newAnnouncement(announcementTitle, invalidAuthor, announcementText)
        }).toThrow(AnnouncementAuthorError);
    })
})