import {
    EmailAnnouncementCommandIdentifier
} from "../../../../server/email_announcement_interaction/EmailAnnouncementCommandIdentifier";
import {SetAnnouncementCommand} from "../../../../server/announcement_management/SetAnnouncementCommand";
import {RemoveAnnouncementCommand} from "../../../../server/announcement_management/RemoveAnnouncementCommand";
import * as MailInteractionConfig from "../../../../server/email_announcement_interaction/MailInteractionConfig.json"
import {newAnnouncement} from "../util/newAnnouncement";

describe("testing EmailAnnouncementCommandIdentifier identifies the correct command", () => {
    test("testing EmailAnnouncementCommandIdentifier identifies SetAnnouncementCommand correctly", () => {
        const announcement = newAnnouncement("title", "bob@example.com", "This is a text for a SetAnnouncementCommand");

        expect(new EmailAnnouncementCommandIdentifier(announcement).identifyCommand()).toBeInstanceOf(SetAnnouncementCommand);
    });

    test("testing EmailAnnouncementCommandIdentifier identifies RemoveAnnouncementCommand correctly", () => {
        const announcement = newAnnouncement("title", "bob@example.com", MailInteractionConfig.REMOVE_ANNOUNCEMENT_TEXT);

        expect(new EmailAnnouncementCommandIdentifier(announcement).identifyCommand()).toBeInstanceOf(RemoveAnnouncementCommand);
    });
});
