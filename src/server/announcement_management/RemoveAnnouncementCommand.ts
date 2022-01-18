import {AnnouncementCommand} from "./AnnouncementCommand";
import {Announcement} from "./Announcement";

export class RemoveAnnouncementCommand implements AnnouncementCommand {

    private readonly announcementToRemove;

    constructor(announcement : Announcement) {
        this.announcementToRemove = announcement;
    }

    executeCommand() {
        // TODO
        throw new Error("not yet implemented");
    }

}