export interface AnnouncementCommand {

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