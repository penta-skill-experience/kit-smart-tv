import {
    AnnouncementCommand,
    AnnouncementCommandError,
    getAnnouncementTitles,
    getAnnouncementForTitle
} from "./AnnouncementCommand";
import {AnnouncementPersistence} from "../../shared/persistence/announcements/AnnouncementPersistence";
import {AnnouncementAuthorTypeIdentifier} from "./AnnouncementAuthorTypeIdentifier";
import {Announcement} from "../../shared/values/Announcement";

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
        await AnnouncementPersistence.getInstance().getAnnouncements().then(result => currentAnnouncements = result);
        const announcementTitles = getAnnouncementTitles(currentAnnouncements);
        if (!announcementTitles.includes(this.announcementToRemove.title)) {
            return;
        }

        const announcementToRemoveFromCurrent = getAnnouncementForTitle(currentAnnouncements, this.announcementToRemove.title);

        const currentVerifiedUsers = await AnnouncementPersistence.getInstance().getVerifiedUsers();
        const authorType = new AnnouncementAuthorTypeIdentifier().getAuthorType(this.announcementToRemove.author, currentVerifiedUsers);

        if (!(announcementToRemoveFromCurrent.author === this.announcementToRemove.author ||
            authorType.isAllowedToEditAnnouncementsFromOtherAuthors())) {
            return;
        }

        const announcementsToSend = [...currentAnnouncements];
        const indexToRemove = announcementsToSend.indexOf(announcementToRemoveFromCurrent, 0);

        announcementsToSend.splice(indexToRemove, 1);

        await AnnouncementPersistence.getInstance().setAnnouncements(announcementsToSend);

    }
}