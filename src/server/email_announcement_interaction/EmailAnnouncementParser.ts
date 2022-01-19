import {AnnouncementParser} from "../announcement_management/AnnouncementParser";
import {Announcement} from "../announcement_management/Announcement";
import {IMailObject} from "mail-listener-typescript";

export class EmailAnnouncementParser implements AnnouncementParser {

    private mail : IMailObject;

    constructor(mail : IMailObject) {
        this.mail = mail;
    }

    parseToAnnouncement(): Announcement {
        return new Announcement(this.mail.subject, this.mail.from.value[0].address, this.mail.text);
    }

}