/**
 * this error class is an illegal argument error for an invalid author.
 *
 * This Error is not meant to be caught.
 */
export class AnnouncementAuthorError extends Error {

    public static readonly DEFAULT_ANNOUNCEMENT_AUTHOR_ERROR_MESSAGE = "Error, the author must be a valid email-address";

    constructor(msg : string) {
        super(msg);

        Object.setPrototypeOf(this, AnnouncementAuthorError.prototype);
    }
}