import {VerifiedUser} from "../../../../shared/values/VerifiedUser";
import {VerifiedUserError} from "../../../../shared/values/VerifiedUserError";

describe("testing VerifiedUser", () => {
    const testEmail = "bob.smith@example.com";
    const testName = "bob";
    const user = new VerifiedUser(testEmail, testName);

    test("testing get email", () => {
        expect(user.email).toEqual(testEmail);
    });

    test("testing get name", () => {
        expect(user.name).toEqual(testName);
    });

    test("testing verified user constructor throws VerifiedUserError if the email is not a valid email", () => {
         expect(() => {
             new VerifiedUser("", testName);
         }).toThrow(VerifiedUserError);
    });
});