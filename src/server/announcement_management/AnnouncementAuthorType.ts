export abstract class AnnouncementAuthorType {

    values = [new AnnouncementAuthorType.ADMIN(), new AnnouncementAuthorType.VERIFIED(),
              new AnnouncementAuthorType.UNVERIFIED];

    static ADMIN = class extends AnnouncementAuthorType {

        isThisAuthorType(author: string): Boolean {
            // TODO
            return false;
        }
    }

    static VERIFIED = class extends AnnouncementAuthorType {

        isThisAuthorType(author: string): Boolean {
            // TODO
            return false;
        }
    }

    static UNVERIFIED = class extends AnnouncementAuthorType {

        isThisAuthorType(author: string): Boolean {
            // TODO
            return false;
        }
    }

    abstract isThisAuthorType(author : string) : Boolean;
}