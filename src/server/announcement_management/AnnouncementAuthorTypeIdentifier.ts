import {AnnouncementAuthorType} from "./AnnouncementAuthorType";

export class AnnouncementAuthorTypeIdentifier {

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