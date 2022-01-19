import {AnnouncementAuthorType} from "./AnnouncementAuthorType";

/**
 * This class is used to identify the author type for a given author.
 */
export class AnnouncementAuthorTypeIdentifier {

    /**
     * Gets the author type as an instance of an implementation of {@code AnnouncementAuthorType}
     *
     * @param author the author as a string. All valid authors as strings are an e-mail address.
     */
    getAuthorType(author : string) : AnnouncementAuthorType {
        let authorTypeToReturn : AnnouncementAuthorType;
        AnnouncementAuthorType.values.forEach(authorType => {
            // this is fine, because the sets associated with each type must be disjoint
            if (authorType.isThisAuthorType(author)) {
                authorTypeToReturn = authorType;
            }
        });
        return authorTypeToReturn;
    }
}