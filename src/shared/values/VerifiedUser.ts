import * as emailValidator from "email-validator"
import {VerifiedUserError} from "./VerifiedUserError";

/**
 * Represents a verified user. A verified user has a name and an e-mail address.
 */
export class VerifiedUser {

    private static readonly INVALID_EMAIL_ERROR_MSG = "Error, the given email was not a valid email-address."

    private _email: string;
    private _name: string;

    /**
     * Creates a verified user with the given email and the given name
     * @param email the given email
     * @param name  the given name
     *
     * @throws VerifiedUserError if the given email is not a valid email
     */
    constructor(email: string, name: string) {
        if (!emailValidator.validate(email)) {
            throw new VerifiedUserError(VerifiedUser.INVALID_EMAIL_ERROR_MSG);
        }
        this._email = email;
        this._name = name;
    }

    get email(): string {
        return this._email;
    }

    get name(): string {
        return this._name;
    }
}
