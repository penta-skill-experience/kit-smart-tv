import {AnnouncementParser} from "../announcement_management/AnnouncementParser";
import {IMailObject} from "mail-listener-typescript";
import {IAnnouncement} from "../../shared/values/IAnnouncement";
import * as AnnouncementConfig from "../announcement_management/AnnouncementConfig.json";
import * as emailValidator from "email-validator";
import {AnnouncementAuthorError} from "../announcement_management/AnnouncementAuthorError";

/**
 * This class is used to parse IMailObjects parsed from mails to instances of Announcement.
 */
export class EmailAnnouncementParser implements AnnouncementParser {

    private mail : IMailObject;

    constructor(mail : IMailObject) {
        this.mail = mail;
    }

    /**
     * Parses the mail this instance was initialized with to an instance of {@Code Announcement}.
     * @returns the created announcement.
     * @throws AnnouncementAuthorError gets thrown, if the author is not a valid e-mail address
     */
    parseToAnnouncement(): IAnnouncement {

        const author = this.mail.subject;
        if (!emailValidator.validate(author)) {
            throw new AnnouncementAuthorError(AnnouncementAuthorError.DEFAULT_ANNOUNCEMENT_AUTHOR_ERROR_MESSAGE);
        }

        const now = Date.now();
        return {
            title: author,
            author: this.mail.from.value[0].address,
            text: this.mail.text,
            timeOfAddition: now,
            timeout: now + AnnouncementConfig.DEFAULT_ANNOUNCEMENT_TIMEOUT,
        };
    }
}