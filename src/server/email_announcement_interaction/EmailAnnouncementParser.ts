import {AnnouncementParser} from "../announcement_management/AnnouncementParser";
import {IMailObject} from "mail-listener-typescript";
import {Announcement} from "../../shared/values/Announcement";
import * as emailValidator from "email-validator";
import {AnnouncementAuthorError} from "../announcement_management/AnnouncementAuthorError";
import {newAnnouncement} from "./newAnnouncement";

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
    parseToAnnouncement(): Announcement {

        const authorAddress = this.mail.from.value[0].address;

        if (!emailValidator.validate(authorAddress)) {
            throw new AnnouncementAuthorError(AnnouncementAuthorError.DEFAULT_ANNOUNCEMENT_AUTHOR_ERROR_MESSAGE);
        }

        return newAnnouncement(
            this.mail.subject, authorAddress, this.mail.text
        );
    }
}