import { z } from "zod";



export const putKvvSchema = z.object({
    body: z.object({
        url: z.string(),
    }),
});