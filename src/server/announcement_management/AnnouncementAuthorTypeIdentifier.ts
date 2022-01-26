import {AnnouncementAuthorType} from "./AnnouncementAuthorType";

/**
 * This class is used to identify the author type for a given author.
 */
export class AnnouncementAuthorTypeIdentifier {

    /**
     * Gets the author type as an instance of an implementation of AnnouncementAuthorType
     *
     * @param author the author as a string. All valid authors as strings are an e-mail address.
     */
    async getAuthorType(author : string) : Promise<AnnouncementAuthorType> {
        return new Promise<AnnouncementAuthorType>(async resolve => {
            let authorTypeToReturn : AnnouncementAuthorType;
            for (const authorType of AnnouncementAuthorType.values) {
                // this is fine, because the sets associated with each type must be disjoint
                // if (authorType.isThisAuthorType(author)) {
                //     authorTypeToReturn = authorType;
                // }
                await authorType.isThisAuthorType(author).then(result => {
                    if (result) {
                        authorTypeToReturn = authorType;
                    }
                });
            }
            resolve(authorTypeToReturn);
        })
    }
}