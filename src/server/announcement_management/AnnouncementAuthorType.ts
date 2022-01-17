import * as AnnouncementConfig from "./AnnouncementConfig.json";
import {AnnouncementPersistence} from "../../shared/persistence/AnnouncementPersistence";

/**
 * This class contains all AnnouncementAuthorTypes as implementations of this abstract class.
 * This class provides an attribute field, which holds the author types.
 * The author type static fields are instances specific to that author type and can therefore be used,
 * to check whether that is the correct author type.
 *
 * This class is supposed to be used like an enum, whose entries are the author types.
 */
export abstract class AnnouncementAuthorType {

    values = [AnnouncementAuthorType.ADMIN, AnnouncementAuthorType.VERIFIED,
              AnnouncementAuthorType.UNVERIFIED];

    static readonly ADMIN = new class extends AnnouncementAuthorType {

        isThisAuthorType(author: string): Boolean {
            let returnValue = false;
            AnnouncementConfig.ADMINS.forEach(admin => {
                if (admin.EMAIL === author) {
                    returnValue = true;
                }
            })
            return returnValue;
        }

};

    static readonly VERIFIED = new class extends AnnouncementAuthorType {

        isThisAuthorType(author: string): Boolean {
            let returnValue = false;
            new AnnouncementPersistence().getVerifiedUsers().forEach(verifiedUser => {
                if (verifiedUser.email === author) {
                    returnValue = true;
                }
            });
            return returnValue;
        }
    }

    static readonly UNVERIFIED = new class extends AnnouncementAuthorType {

        isThisAuthorType(author: string): Boolean {
            return !AnnouncementAuthorType.VERIFIED.isThisAuthorType(author) &&
                !AnnouncementAuthorType.ADMIN.isThisAuthorType(author);
        }
    }

    /**
     * returns true, if the given author is of this author type.
     * @param author the given author
     */
    abstract isThisAuthorType(author : string) : Boolean;
}