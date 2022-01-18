import { AnnouncementAuthorError } from "./AnnouncementAuthorError";
import * as AnnouncementConfig from "./AnnouncementConfig.json";

/**
 * an instance of this class represents an announcement.
 *
 * An announcement is identified by its title.
 *
 * The author of an announcement must be an e-mail address.
 *
 * The time of addition is the unix timestamp of the time, when the announcement was added to the system.
 *
 * The timeout is the unix timestamp of the time, when the timeout of the announcement occurs.
 */
export class Announcement {

    private readonly _title: string;
    private readonly _author: string
    private readonly _timeOfAddition: number;
    private readonly _timeout: number;

    private _text: string;

    /**
     * Creates an announcement with the specified parameters.
     * @param title The title of the announcement.
     * @param author The author of the announcement. Must be a valid e-mail address.
     * @param text The text of the announcement.
     * @param timeOfAddition The timeOfAddition. This is optional. If this is not given, the current time is used
     * @param durationToTimeout The duration until the timeout of this announcement occurs. This is optional. If this is not given a default duration is used.
     *
     * @throws AnnouncementAuthorError gets thrown, if the author is not a valid e-mail address
     */
    public constructor(title: string, author: string, text: string, timeOfAddition: number=Date.now(),
                       durationToTimeout: number=+AnnouncementConfig.DEFAULT_ANNOUNCEMENT_TIMEOUT) {
        if (!Announcement.validateAuthor(author)) {
            throw new AnnouncementAuthorError(
                AnnouncementAuthorError.DEFAULT_ANNOUNCEMENT_AUTHOR_ERROR_MESSAGE);
        }
        this._title = title;
        this._author = author;
        this._text = text;
        this._timeOfAddition = timeOfAddition
        this._timeout = this._timeOfAddition + durationToTimeout;
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

    get timeOfAddition(): number {
        return this._timeOfAddition;
    }

// author must be an email-address
    private static validateAuthor(authorToValidate: String): Boolean {
        const validator = require("email-validator");
        return validator.validate(authorToValidate);
    }
}