import { z } from "zod";



export const putCurlSchema = z.object({
    body: z.object({
        url: z.string(),
    }),
});