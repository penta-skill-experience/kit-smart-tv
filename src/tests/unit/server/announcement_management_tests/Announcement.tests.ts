import {Announcement} from "../../../../server/announcement_management/Announcement";
import * as AnnouncementConfig from "../../../../server/announcement_management/AnnouncementConfig.json";

// TODO: write test for throw of announcementAuthorError

describe("testing getters and setters of Announcement.ts", () => {
    const announcementTitle = "HelloWorld";
    const announcementAuthor = "john.smith@example.com";
    const announcementText = "What a wonderful world";

    const announcement = new Announcement(announcementTitle, announcementAuthor, announcementText);

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
        expect(announcement.timeout).toEqual(AnnouncementConfig.DEFAULT_ANNOUNCEMENT_TIMEOUT);
    })

    test("testing set text()", () => {
        const newText = "New text";
        announcement.text = newText;
        expect(announcement.text).toEqual(newText);
    })
})