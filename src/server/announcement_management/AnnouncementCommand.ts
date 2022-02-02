import {IAnnouncement} from "../../shared/values/IAnnouncement";

/**
 * This is an interface to be implemented by announcement commands.
 * An announcement command is a command, that changes the
 * state of the stored announcements.
 */
export interface AnnouncementCommand {

    /**
     * executes this command
     */
    executeCommand();

}

/**
 * this error class is used for errors, that are thrown during the execution of an AnnouncementCommand.
 *
 * An error of this class is meant to be caught.
 */
export class AnnouncementCommandError extends Error {

    constructor(msg : string) {
        super(msg);

        Object.setPrototypeOf(this, AnnouncementCommandError.prototype);
    }
}

/**
 * this error class is used, if an announcement with an illegal text for that command is given in the constructor
 * for an AnnouncementCommand.
 *
 * An error of this class is not meant to be caught.
 */
export class IllegalAnnouncementTextForCommandError extends Error {

    constructor(msg : string) {
        super(msg);

        Object.setPrototypeOf(this, IllegalAnnouncementTextForCommandError.prototype);
    }
}

/**
 * Returns an array of strings containing the titles of the supplied announcements.
 *
 * @param announcements the supplied announcements
 */
export function getAnnouncementTitles(announcements: IAnnouncement[]) : string[] {
    return announcements.map(announcement => {
        return announcement.title;
    });
}

/**
 * Returns the announcement with the given title from the supplied announcements or undefined if no such
 * announcement exists.
 *
 * @param announcements the supplied announcements
 * @param title the title of the announcement to find
 */
export function getAnnouncementForTitle(announcements : IAnnouncement[], title : string): IAnnouncement | undefined {
    let announcementToReturn : IAnnouncement;
    announcements.forEach(currentAnnouncement => {
        // there is only ever one announcement for each title, if it exists That announcement is found and stored.
        if (currentAnnouncement.title === title) {
            announcementToReturn = currentAnnouncement;
        }
    })
    return announcementToReturn;
}
