import {
    AnnouncementCommand,
    AnnouncementCommandError,
    IllegalAnnouncementTextForCommandError
} from "./AnnouncementCommand";
import {Announcement} from "./Announcement";
import {AnnouncementAuthorTypeIdentifier} from "./AnnouncementAuthorTypeIdentifier";
import {AnnouncementPersistence} from "../../shared/persistence/AnnouncementPersistence";
import {AnnouncementAuthorType} from "./AnnouncementAuthorType";

export class SetAnnouncementCommand implements AnnouncementCommand {

    private static readonly INVALID_ANNOUNCEMENT_TEXT = "";
    private static readonly INVALID_ANNOUNCEMENT_TEXT_ERROR_MSG = "Error, the announcement text for this command " +
        "cannot be an empty string";
    private static readonly THIS_AUTHOR_CANNOT_EDIT_THIS_ANNOUNCEMENT_ERROR_MSG = "Error, this announcement author cannot " +
        "edit this announcement.";
    private static readonly THIS_AUTHOR_NOT_ALLOWED_TO_ADD_ANN_ERROR_MSG = "Error, this announcement author is not " +
        "allowed to add announcements";


    private readonly announcement : Announcement;

    /**
     * Constructs a SetAnnouncementCommand.
     * @param announcement the announcement to execute this command for.
     */
    constructor(announcement : Announcement) {
        if (announcement.text === SetAnnouncementCommand.INVALID_ANNOUNCEMENT_TEXT) {
            throw new IllegalAnnouncementTextForCommandError(SetAnnouncementCommand.INVALID_ANNOUNCEMENT_TEXT_ERROR_MSG);
        }
        this.announcement = announcement;
    }

    executeCommand() {
        const authorType = new AnnouncementAuthorTypeIdentifier().getAuthorType(this.announcement.author);

        const currentAnnouncements = new AnnouncementPersistence().getAnnouncements();
        const currentAnnouncementTitles = currentAnnouncements.map(currentAnnouncement => {
            return currentAnnouncement.title;
        });
        if (currentAnnouncementTitles.includes(this.announcement.title)) {
            this.editAnnouncement(authorType, currentAnnouncements);
        } else {
            this.addAnnouncement(authorType, currentAnnouncements);
        }
    }

    private editAnnouncement(authorType : AnnouncementAuthorType, currentAnnouncements : Announcement[]) {
        const announcementToEdit = currentAnnouncements.map(currentAnnouncement => {
            if (currentAnnouncement.title === this.announcement.title) {
                return currentAnnouncement;
            }
        })[0]; // there is only ever one announcement with that title. That announcement is found and stored.

        if (!(announcementToEdit.author === this.announcement.author
            || authorType.isAllowedToEditAnnouncementsFromOtherAuthors())) {
            throw new AnnouncementCommandError(SetAnnouncementCommand.THIS_AUTHOR_CANNOT_EDIT_THIS_ANNOUNCEMENT_ERROR_MSG);
        }
        const announcementsToSend = [...currentAnnouncements];
        const indexToRemove = announcementsToSend.indexOf(announcementToEdit, 0);
        if (indexToRemove > -1) {
            announcementsToSend.splice(indexToRemove, 1);
        }
        this.pushAnnouncementAndSendToPersistence(announcementsToSend);
    }

    private addAnnouncement(authorType : AnnouncementAuthorType, currentAnnouncements : Announcement[]) {
        if (!authorType.isAllowedToAddAnnouncement()) {
            throw new AnnouncementCommandError(SetAnnouncementCommand.THIS_AUTHOR_NOT_ALLOWED_TO_ADD_ANN_ERROR_MSG);
        }
        this.pushAnnouncementAndSendToPersistence(currentAnnouncements);
    }

    private pushAnnouncementAndSendToPersistence(announcements : Announcement[]) {
        const announcementsToSend = [...announcements];
        announcementsToSend.push(this.announcement);
        new AnnouncementPersistence().setAnnouncements(announcementsToSend);
    }

}