import { AnnouncementAuthorError } from "./AnnouncementAuthorError";
import * as AnnouncementConfig from "./AnnouncementConfig.json";

export class Announcement {

    private readonly _title: string;
    private readonly _author: string
    private readonly timeOfAddition: number;
    private readonly _timeout: number;

    private _text: string;

    /**
     * Creates an announcement with the specified parameters.
     * @param title The title of the announcement.
     * @param author The author of the announcement. Must be a valid e-mail address.
     * @param text The text of the announcement.
     * @param timeOfAddition The timeOfAddition. This is optional. If this is not given, the current time is used
     * @param DurationToTimeout The duration until the timeout of this announcement occurs. This is optional. If this is not given a default duration is used.
     *
     * @throws AnnouncementAuthorError gets thrown, if the author is not a valid e-mail address
     */
    public constructor(title: string, author: string, text: string, timeOfAddition: number=Date.now(),
                       DurationToTimeout: number=+AnnouncementConfig.DEFAULT_ANNOUNCEMENT_TIMEOUT) {
        if (!Announcement.validateAuthor(author)) {
            throw new AnnouncementAuthorError(
                AnnouncementAuthorError.DEFAULT_ANNOUNCEMENT_AUTHOR_ERROR_MESSAGE);
        }
        this._title = title;
        this._author = author;
        this._text = text;
        this.timeOfAddition = timeOfAddition
        this._timeout = this.timeOfAddition +DurationToTimeout;
    }

    public get text(): string {
        return this._text;
    }

    public set text(value: string) {
        this._text = value;
    }

    public get timeout(): number {
        return this._timeout;
    }

    public get author(): string {
        return this._author;
    }

    public get title(): string {
        return this._title;
    }

// author must be an email-address
    private static validateAuthor(authorToValidate: String): Boolean {
        const validator = require("email-validator");
        return validator.validate(authorToValidate);
    }
}