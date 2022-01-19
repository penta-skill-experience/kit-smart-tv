import {IMailObject} from "mail-listener-typescript";
import {EmailAnnouncementParser} from "./EmailAnnouncementParser";
import {EmailAnnouncementCommandIdentifier} from "./EmailAnnouncementCommandIdentifier";
import {AnnouncementCommandError} from "../announcement_management/AnnouncementCommand";

export class EmailAnnouncementExecutor {

    executeEmailCommand(mail : IMailObject) {
        const parsedAnnouncement = new EmailAnnouncementParser(mail).parseToAnnouncement();

        try {
            new EmailAnnouncementCommandIdentifier(parsedAnnouncement).identifyCommand().executeCommand();
        } catch(e) {
            if (e instanceof AnnouncementCommandError) {
                // can later be used to send feedback
            } else {
                throw e;
            }
        }
    }
}