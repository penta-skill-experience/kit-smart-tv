import {Announcement} from "./Announcement";

export interface AnnouncementParser {
    parseToAnnouncement() : Announcement;
}