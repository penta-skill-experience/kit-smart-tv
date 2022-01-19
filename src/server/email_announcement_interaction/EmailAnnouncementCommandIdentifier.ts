import {Announcement} from "../announcement_management/Announcement";
import {AnnouncementCommand} from "../announcement_management/AnnouncementCommand";
import * as MailInteractionConfig from "./MailInteractionConfig.json";
import {RemoveAnnouncementCommand} from "../announcement_management/RemoveAnnouncementCommand";
import {SetAnnouncementCommand} from "../announcement_management/SetAnnouncementCommand";

export class EmailAnnouncementCommandIdentifier {

    private readonly announcement : Announcement;

    constructor(announcement : Announcement) {
        this.announcement = announcement;
    }

    identifyCommand() : AnnouncementCommand {
        if (this.announcement.text === MailInteractionConfig.REMOVE_ANNOUNCEMENT_TEXT) {
            return new RemoveAnnouncementCommand(this.announcement);
        } else {
            return(new SetAnnouncementCommand(this.announcement));
        }
    }
}