import * as AnnouncementConfig from "./AnnouncementConfig.json";

export class Announcement {

    private readonly title : string;
    private readonly author : string
    private readonly timeOfAddition : number;

    private text : string;
    private timeout : number;


    public constructor(title : string, author : string, text : string) {
        if (!this.validateAuthor(author)) {
            throw new Announcement.AnnouncementAuthorError(Announcement.AnnouncementAuthorError.DEFAULT_ANNOUNCEMENT_AUTHOR_ERROR_MESSAGE);
        }
        this.title = title;
        this.author = author;
        this.text = text;

        this.timeOfAddition = Date.now();
        this.timeout = this.timeOfAddition + +AnnouncementConfig.DEFAULT_ANNOUNCEMENT_TIMEOUT
    }

    // author must be an email-address
    private validateAuthor(authorToValidate : String) : Boolean {
        const validator = require("email-validator");
        return validator.validate(authorToValidate);
    }

    static AnnouncementAuthorError = class extends Error {

        static DEFAULT_ANNOUNCEMENT_AUTHOR_ERROR_MESSAGE = "Error, the announcement author must be a valid e-mail address";

        constructor(msg : string) {
            super(msg);
        }
    }
}