import * as AnnouncementConfig from "../announcement_management/AnnouncementConfig.json";
import {AnnouncementAuthorError} from "../announcement_management/AnnouncementAuthorError";
import * as emailValidator from "email-validator";
import {Announcement} from "../../shared/values/Announcement";

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
export function newAnnouncement(title: string, author: string, text: string,
                                timeOfAddition: number = Date.now(),
                                durationToTimeout: number = AnnouncementConfig.DEFAULT_ANNOUNCEMENT_TIMEOUT): Announcement {

    if (!emailValidator.validate(author)) {
        throw new AnnouncementAuthorError(
            AnnouncementAuthorError.DEFAULT_ANNOUNCEMENT_AUTHOR_ERROR_MESSAGE);
    }
    return {
        title: title,
        author: author,
        text: text,
        timeOfAddition: timeOfAddition,
        timeout: timeOfAddition + durationToTimeout,
    }
}

