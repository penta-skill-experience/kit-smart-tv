import * as AnnouncementConfig from "./AnnouncementConfig.json";
import {AnnouncementPersistence} from "../../shared/persistence/AnnouncementPersistence";

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
     * An instance of an implementation of {@code AnnouncementAuthorType}.
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

        isThisAuthorType(author: string): Promise<Boolean> {
            let returnValue = false;
            AnnouncementConfig.ADMINS.forEach(admin => {
                if (admin.EMAIL === author) {
                    returnValue = true;
                }
            })
            return new Promise<Boolean>(resolve => resolve(returnValue));
        }

    };

    /**
     * An instance of an implementation of {@code AnnouncementAuthorType}.
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

        isThisAuthorType(author: string): Promise<Boolean> {
            return new Promise<Boolean>(resolve => {
                let returnValue = false;
                new AnnouncementPersistence().getVerifiedUsers().then(
                    data => data.filter(verifiedUser => !AnnouncementAuthorType.ADMIN.isThisAuthorType(verifiedUser.email))  // removing admins from list of verifies users to avoid overwriting admin type
                        .forEach(verifiedUser => {
                            if (verifiedUser.email === author) {
                                returnValue = true;
                            }
                        })
                );
                resolve(returnValue);
            });
        }
    }

    /**
     * An instance of an implementation of {@code AnnouncementAuthorType}.
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

        isThisAuthorType(author: string): Promise<Boolean> {
            const returnValue = !AnnouncementAuthorType.VERIFIED.isThisAuthorType(author) &&
                !AnnouncementAuthorType.ADMIN.isThisAuthorType(author);
            return new Promise(resolve => resolve(returnValue));
        }
    }

    static values = [AnnouncementAuthorType.ADMIN, AnnouncementAuthorType.VERIFIED,
        AnnouncementAuthorType.UNVERIFIED];

    /**
     * returns true, if the given author is of this author type.
     * @param author the given author
     */
    abstract isThisAuthorType(author: string): Promise<Boolean>;

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