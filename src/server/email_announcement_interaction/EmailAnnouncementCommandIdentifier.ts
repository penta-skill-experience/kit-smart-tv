import {AnnouncementCommand} from "../announcement_management/AnnouncementCommand";
import * as MailInteractionConfig from "./MailInteractionConfig.json";
import {RemoveAnnouncementCommand} from "../announcement_management/RemoveAnnouncementCommand";
import {SetAnnouncementCommand} from "../announcement_management/SetAnnouncementCommand";
import {IAnnouncement} from "../../shared/values/IAnnouncement";

/**
 * This class is used to identify the announcement command for an announcement parsed from a mail.
 */
export class EmailAnnouncementCommandIdentifier {

    private readonly announcement : IAnnouncement;

    constructor(announcement : IAnnouncement) {
        this.announcement = announcement;
    }

    /**
     * Identifies the command for the announcement this instance was instantiated and creates
     * an instance of that command with the announcement this instance was instantiated.
     *
     * @returns the created instance of AnnouncementCommand
     */
    identifyCommand() : AnnouncementCommand {
        if (this.announcement.text === MailInteractionConfig.REMOVE_ANNOUNCEMENT_TEXT) {
            return new RemoveAnnouncementCommand(this.announcement);
        } else {
            return(new SetAnnouncementCommand(this.announcement));
        }
    }
}