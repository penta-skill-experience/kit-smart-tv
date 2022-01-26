import {
    AnnouncementCommand,
    AnnouncementCommandError,
    getAnnouncementTitles,
    getAnnouncementForTitle
} from "./AnnouncementCommand";
import {Announcement} from "./Announcement";
import {AnnouncementPersistence} from "../../shared/persistence/AnnouncementPersistence";
import {AnnouncementAuthorTypeIdentifier} from "./AnnouncementAuthorTypeIdentifier";
import {AnnouncementAuthorType} from "./AnnouncementAuthorType";

/**
 * An implementation of {@link AnnouncementCommand}
 *
 * This command removes the announcement it is initialized with from the stored announcement.
 */
export class RemoveAnnouncementCommand implements AnnouncementCommand {

    private static readonly AUTHOR_CANNOT_REMOVE_THIS_ANNOUNCEMENT_ERROR_MSG = "Error, this author cannot " +
        "remove this announcement."

    private readonly announcementToRemove;

    constructor(announcement : Announcement) {
        this.announcementToRemove = announcement;
    }

    async executeCommand() {
        let currentAnnouncements : Announcement[]
        await new AnnouncementPersistence().getAnnouncements().then(result => currentAnnouncements = result);
        const announcementTitles = getAnnouncementTitles(currentAnnouncements);
        if (!announcementTitles.includes(this.announcementToRemove.title)) {
            return;
        }

        const announcementToRemoveFromCurrent = getAnnouncementForTitle(currentAnnouncements, this.announcementToRemove.title);
        let authorType : AnnouncementAuthorType;
        await new AnnouncementAuthorTypeIdentifier().getAuthorType(this.announcementToRemove.author).then(result => {
            authorType = result;
        });

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