import * as AnnouncementConfig from "./AnnouncementConfig.json";
import {VerifiedUser} from "../../shared/values/VerifiedUser";

/**
 * This class contains all AnnouncementAuthorTypes as implementations of this abstract class.
 * This class provides an attribute field, which holds the author types.
 * The author type static fields are instances specific to that author type and can therefore be used,
 * to check whether that is the correct author type.
 *
 * This class is supposed to be used like an enum, whose entries are the author types.
 *
 * An author may only ever be associated with one of these types. Meaning for example, an admin cannot also be a verified user
 */
export abstract class AnnouncementAuthorType {

    /**
     * An instance of an implementation of AnnouncementAuthorType.
     *
     * This instance is used to represent the author type ADMIN.
     */
    static readonly ADMIN = new class extends AnnouncementAuthorType {

        isAllowedToAddAnnouncement(): Boolean {
            return true;
        }

        isAllowedToEditAnnouncementsFromOtherAuthors(): Boolean {
            return true;
        }

        isThisAuthorType(author: string, verifiedUsers: VerifiedUser[]): Boolean {
            for (const admin of AnnouncementConfig.ADMINS) {
                if (admin.EMAIL === author) {
                    return true;
                }
            }
            return false;
        }

    };

    /**
     * An instance of an implementation of AnnouncementAuthorType.
     *
     * This instance is used to represent the author type VERIFIED.
     */
    static readonly VERIFIED = new class extends AnnouncementAuthorType {

        isAllowedToAddAnnouncement(): Boolean {
            return true;
        }

        isAllowedToEditAnnouncementsFromOtherAuthors(): Boolean {
            return false;
        }

        isThisAuthorType(author: string, verifiedUsers: VerifiedUser[]): Boolean {
            if (AnnouncementAuthorType.ADMIN.isThisAuthorType(author, verifiedUsers)) {
                return false;
            }
            for (const verifiedUser of verifiedUsers) {
                if (verifiedUser.email === author) {
                    return true;
                }
            }
            return false;
        }
    }

    /**
     * An instance of an implementation of AnnouncementAuthorType.
     *
     * This instance is used to represent the author type UNVERIFIED.
     */
    static readonly UNVERIFIED = new class extends AnnouncementAuthorType {

        isAllowedToAddAnnouncement(): Boolean {
            return false;
        }

        isAllowedToEditAnnouncementsFromOtherAuthors(): Boolean {
            return false;
        }

        isThisAuthorType(author: string, verifiedUsers: VerifiedUser[]): Boolean {
            return !AnnouncementAuthorType.VERIFIED.isThisAuthorType(author, verifiedUsers) &&
                !AnnouncementAuthorType.ADMIN.isThisAuthorType(author, verifiedUsers);
        }
    }

    static values = [AnnouncementAuthorType.ADMIN, AnnouncementAuthorType.VERIFIED,
        AnnouncementAuthorType.UNVERIFIED];

    /**
     * returns true, if the given author is of this author type.
     * @param author the given author
     * @param verifiedUsers the current verified users as loaded from the persistence
     */
    abstract isThisAuthorType(author: string, verifiedUsers: VerifiedUser[]): Boolean;

    /**
     * returns true, if the author type this is called for is allowed to add announcements, otherwise false.
     */
    abstract isAllowedToAddAnnouncement(): Boolean;

    /**
     * returns true, if the author type this is called for is allowed to edit announcements from
     * other authors, otherwise false.
     */
    abstract isAllowedToEditAnnouncementsFromOtherAuthors(): Boolean;
}