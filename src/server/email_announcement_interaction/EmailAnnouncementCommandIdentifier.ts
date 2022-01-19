import {Announcement} from "../announcement_management/Announcement";
import {AnnouncementCommand} from "../announcement_management/AnnouncementCommand";

export class EmailAnnouncementCommandIdentifier {

    identifyCommand(announcement : Announcement) : AnnouncementCommand {
        throw new Error("not yet implemented");
    }
}