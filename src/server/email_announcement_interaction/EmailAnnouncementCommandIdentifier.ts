import {Announcement} from "../announcement_management/Announcement";
import {AnnouncementCommand} from "../announcement_management/AnnouncementCommand";

export class EmailAnnouncementCommandIdentifier {

    private readonly announcement : Announcement;

    constructor(announcement : Announcement) {
        this.announcement = announcement;
    }

    identifyCommand() : AnnouncementCommand {
        throw new Error("not yet implemented");
    }
}