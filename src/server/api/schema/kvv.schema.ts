import { z } from "zod";



export const getKvvSchema = z.object({
    body: z.object({
        url: z.string(),
    }),
});