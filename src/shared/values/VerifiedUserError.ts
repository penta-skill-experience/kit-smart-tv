/**
 * this error class is an illegal argument error for invalid arguments for an instance of VerifiedUesr.
 *
 * An instance of this class must be instantiated with an error message.
 *
 * This Error is not meant to be caught.
 */
export class VerifiedUserError extends Error {

    constructor(msg : string) {
        super(msg);

        Object.setPrototypeOf(this, VerifiedUserError.prototype);
    }
}