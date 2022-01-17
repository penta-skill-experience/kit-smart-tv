import {AnnouncementCommand} from "./AnnouncementCommand";
import {Announcement} from "./Announcement";

export class SetAnnouncementCommand implements AnnouncementCommand {

    private announcement : Announcement

    /**
     * Constructs a SetAnnouncementCommand.
     * @param announcement the announcement to execute this command for.
     */
    constructor(announcement : Announcement) {
        this.announcement = announcement;
    }

    executeCommand() {
        throw new Error("Method not implemented.");
    }

}