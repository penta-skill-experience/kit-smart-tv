import {IMailObject} from "mail-listener-typescript";
import {EmailAnnouncementParser} from "./EmailAnnouncementParser";
import {EmailAnnouncementCommandIdentifier} from "./EmailAnnouncementCommandIdentifier";
import {AnnouncementCommandError} from "../announcement_management/AnnouncementCommand";

/**
 * This class is used to find and execute the appropriate command for an incoming mail.
 */
export class EmailAnnouncementExecutor {

    /**
     * executes the appropriate AnnouncementCommand for the received mailObject.
     * @param mail the received mailObject, an IMailObject parsed from an email
     */
    executeEmailCommand(mail : IMailObject) {
        const parsedAnnouncement = new EmailAnnouncementParser(mail).parseToAnnouncement();

        try {
            new EmailAnnouncementCommandIdentifier(parsedAnnouncement).identifyCommand().executeCommand()
                .catch(reason => {
                    console.error(reason);
                });
        } catch(e) {
            if (e instanceof AnnouncementCommandError) {
                // can later be used to send feedback
            } else {
                throw e;
            }
        }
    }
}