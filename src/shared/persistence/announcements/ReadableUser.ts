import {VerifiedUser} from "../../values/VerifiedUser";

export class ReadableUser {
    public email: string;
    public name: string;

    public constructor(user: VerifiedUser) {
        this.email = user.email;
        this.name = user.name;
    }
}