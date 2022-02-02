import {IAnnouncement} from "../../shared/values/IAnnouncement";

/**
 * an interface for classes that parse an input method to an instance of the class {@code Announcement}.
 */
export interface AnnouncementParser {

    /**
     * parses the state of this instance to an announcement.
     */
    parseToAnnouncement(): IAnnouncement;
}