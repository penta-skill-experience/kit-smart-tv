import { z } from "zod";

export const updateUsersSchema = z.object({
    body: z.object({
        usersDataList: z.array(z.object({
            email: z.string().email(),
            name: z.string(),
        })),
    }),
});