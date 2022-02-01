import {object, string, TypeOf} from "zod";

export const createAdminSchema = object({
    body: object({
        password: string({
            required_error: "Password is required",
        }).min(6, "Password too short - should be 6 chars minimum"),
    })
});

export type CreateAdminInput = TypeOf<typeof createAdminSchema>;

export const updatePasswordSchema = object({
    body: object({
        password: string({
            required_error: "old password is required",
        }),
        new_password: string({
            required_error: "new password is required"
        }).min(1, "New password too short - should be 1 chars minimum"),
    }).refine((data) => data.password !== data.new_password, {
        message: "New passwords has to differ from old password",
        path: ["passwordConfirmation"],
    })
});

export type updatePasswordInput = TypeOf<typeof updatePasswordSchema>;
