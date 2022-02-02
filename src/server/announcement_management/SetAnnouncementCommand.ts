import {
    AnnouncementCommand,
    AnnouncementCommandError,
    IllegalAnnouncementTextForCommandError,
    getAnnouncementTitles,
    getAnnouncementForTitle
} from "./AnnouncementCommand";
import {AnnouncementAuthorTypeIdentifier} from "./AnnouncementAuthorTypeIdentifier";
import {AnnouncementPersistence} from "../../shared/persistence/announcements/AnnouncementPersistence";
import {AnnouncementAuthorType} from "./AnnouncementAuthorType";
import {Announcement} from "../../shared/values/Announcement";

/**
 * An implementation of {@link AnnouncementCommand}.
 *
 * An instance of this class is initialized with an announcement, instance of {@link Announcement}.
 *
 * If an announcement with the title of that announcement already exists, the text of that
 * announcement is set to the text of that announcement. Only the same author or an admin can
 * update the announcement.
 *
 * If such an announcement doesn't exist yet, the announcement is stored. Only a verified user or
 * an admin can add an announcement.
 */
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

    async executeCommand() {
        const currentVerifiedUsers = await AnnouncementPersistence.getInstance().getVerifiedUsers();
        const authorType = new AnnouncementAuthorTypeIdentifier().getAuthorType(this.announcement.author
            , currentVerifiedUsers)

        const currentAnnouncements = await AnnouncementPersistence.getInstance().getAnnouncements();
        const currentAnnouncementTitles = getAnnouncementTitles(currentAnnouncements);

        if (currentAnnouncementTitles.includes(this.announcement.title)) {
            this.editAnnouncement(authorType, currentAnnouncements);
        } else {
            this.addAnnouncement(authorType, currentAnnouncements);
        }
    }

    private editAnnouncement(authorType : AnnouncementAuthorType, currentAnnouncements : Announcement[]) {
        const announcementToEdit = getAnnouncementForTitle(currentAnnouncements, this.announcement.title);

        if (!(announcementToEdit.author === this.announcement.author
            || authorType.isAllowedToEditAnnouncementsFromOtherAuthors())) {
            throw new AnnouncementCommandError(SetAnnouncementCommand.THIS_AUTHOR_CANNOT_EDIT_THIS_ANNOUNCEMENT_ERROR_MSG);
        }
        const announcementsToSend = [...currentAnnouncements];
        const indexToRemove = announcementsToSend.indexOf(announcementToEdit, 0);

        announcementsToSend.splice(indexToRemove, 1);

        this.pushAnnouncementAndSendToPersistence(announcementsToSend);
    }

    private addAnnouncement(authorType : AnnouncementAuthorType, currentAnnouncements: Announcement[]) {
        if (!authorType.isAllowedToAddAnnouncement()) {
            throw new AnnouncementCommandError(SetAnnouncementCommand.THIS_AUTHOR_NOT_ALLOWED_TO_ADD_ANN_ERROR_MSG);
        }
        this.pushAnnouncementAndSendToPersistence(currentAnnouncements);
    }

    private pushAnnouncementAndSendToPersistence(announcements: Announcement[]) {
        const announcementsToSend = [...announcements];
        announcementsToSend.push(this.announcement);
        AnnouncementPersistence.getInstance().setAnnouncements(announcementsToSend);
    }
}