import { z } from "zod";

export const updateConfigSchema = z.object({
    body: z.object({
        fontSize: z.string(),
        colorScheme: z.string(),
        background: z.string().url(),
    }),
});