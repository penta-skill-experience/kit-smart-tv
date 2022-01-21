import {AnnouncementParser} from "../announcement_management/AnnouncementParser";
import {Announcement} from "../announcement_management/Announcement";
import {IMailObject} from "mail-listener-typescript";

/**
 * This class is used to parse IMailObjects parsed from mails to instances of {@Code Announcement}.
 */
export class EmailAnnouncementParser implements AnnouncementParser {

    private mail : IMailObject;

    constructor(mail : IMailObject) {
        this.mail = mail;
    }

    /**
     * Parses the mail this instance was initialized with to an instance of {@Code Announcement}.
     * @returns the created announcement.
     */
    parseToAnnouncement(): Announcement {
        return new Announcement(this.mail.subject, this.mail.from.value[0].address, this.mail.text);
    }

}