import {AnnouncementAuthorType} from "./AnnouncementAuthorType";
import {VerifiedUser} from "../../shared/values/VerifiedUser";

/**
 * This class is used to identify the author type for a given author.
 */
export class AnnouncementAuthorTypeIdentifier {

    /**
     * Gets the author type as an instance of an implementation of AnnouncementAuthorType
     *
     * @param author the author as a string. All valid authors as strings are an e-mail address.
     * @param verifiedUsers the current verified users as loaded from the persistence
     */
    getAuthorType(author : string, verifiedUsers : VerifiedUser[]) : AnnouncementAuthorType {
        let authorTypeToReturn : AnnouncementAuthorType
        for (const authorType of AnnouncementAuthorType.values) {
            if (authorType.isThisAuthorType(author, verifiedUsers)) {
                // will be the case for exactly one author type
                authorTypeToReturn = authorType;
            }
        }
        return authorTypeToReturn;
    }
}