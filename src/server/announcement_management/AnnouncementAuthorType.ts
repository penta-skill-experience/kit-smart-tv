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
            throw new Error("Method not implemented.");
        }

};

    static VERIFIED = new class extends AnnouncementAuthorType {

        isThisAuthorType(author: string): Boolean {
            // TODO
            return false;
        }
    }

    static UNVERIFIED = new class extends AnnouncementAuthorType {

        isThisAuthorType(author: string): Boolean {
            // TODO
            return false;
        }
    }

    /**
     * returns true, if the given author is of this author type.
     * @param author the given author
     */
    abstract isThisAuthorType(author : string) : Boolean;
}