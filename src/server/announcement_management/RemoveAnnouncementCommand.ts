import {
    AnnouncementCommand,
    AnnouncementCommandError,
    getAnnouncementTitles,
    getAnnouncementForTitle
} from "./AnnouncementCommand";
import {Announcement} from "./Announcement";
import {AnnouncementPersistence} from "../../shared/persistence/AnnouncementPersistence";
import {AnnouncementAuthorTypeIdentifier} from "./AnnouncementAuthorTypeIdentifier";

export class RemoveAnnouncementCommand implements AnnouncementCommand {

    private static readonly AUTHOR_CANNOT_REMOVE_THIS_ANNOUNCEMENT_ERROR_MSG = "Error, this author cannot " +
        "remove this announcement."

    private readonly announcementToRemove;

    constructor(announcement : Announcement) {
        this.announcementToRemove = announcement;
    }

    executeCommand() {
        const currentAnnouncements = new AnnouncementPersistence().getAnnouncements();
        const announcementTitles = getAnnouncementTitles(currentAnnouncements);
        if (!announcementTitles.includes(this.announcementToRemove.title)) {
            return;
        }

        const announcementToRemoveFromCurrent = getAnnouncementForTitle(currentAnnouncements, this.announcementToRemove.title);
        const authorType = new AnnouncementAuthorTypeIdentifier().getAuthorType(this.announcementToRemove.author);

        if (!(announcementToRemoveFromCurrent.author === this.announcementToRemove.author ||
            authorType.isAllowedToEditAnnouncementsFromOtherAuthors())) {
            throw new AnnouncementCommandError(RemoveAnnouncementCommand.AUTHOR_CANNOT_REMOVE_THIS_ANNOUNCEMENT_ERROR_MSG);
        }

        const announcementsToSend = [...currentAnnouncements];
        const indexToRemove = announcementsToSend.indexOf(announcementToRemoveFromCurrent, 0);

        announcementsToSend.splice(indexToRemove, 1);

        new AnnouncementPersistence().setAnnouncements(announcementsToSend);

    }
}