import {Announcement} from "../../../../server/announcement_management/Announcement";
import {
    EmailAnnouncementCommandIdentifier
} from "../../../../server/email_announcement_interaction/EmailAnnouncementCommandIdentifier";
import {SetAnnouncementCommand} from "../../../../server/announcement_management/SetAnnouncementCommand";
import {RemoveAnnouncementCommand} from "../../../../server/announcement_management/RemoveAnnouncementCommand";

test("testing EmailAnnouncementCommandIdentifier identifies SetAnnouncementCommand correctly", () => {
    const announcement = new Announcement("title", "bob@example.com", "This is a text for a SetAnnouncementCommand");

    expect(new EmailAnnouncementCommandIdentifier(announcement).identifyCommand()).toBeInstanceOf(SetAnnouncementCommand);
});

test("testing EmailAnnouncementCommandIdentifier identifies RemoveAnnouncementCommand correctly", () => {
    const removeAnnouncementText = "";
    const announcement = new Announcement("title", "bob@example.com", removeAnnouncementText);

    expect(new EmailAnnouncementCommandIdentifier(announcement).identifyCommand()).toBeInstanceOf(RemoveAnnouncementCommand);
});