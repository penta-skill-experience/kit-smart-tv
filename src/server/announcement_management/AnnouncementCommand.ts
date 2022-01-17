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