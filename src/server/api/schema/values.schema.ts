import {z} from "zod";

export const updateValuesSchema = z.object({
    body: z.object({
        fontSizes: z.array(z.object({
            id: z.string({
                required_error: "id is required",
            }),
            name: z.string(),
            relativeSize: z.number(),
        })),
        colorSchemes: z.array(z.object({
            id: z.string(),
            name: z.string(),
            titleFontColor: z.string(),
            bodyFontColor: z.string(),
            specialBoldFontColor: z.string(),
            specialSubtleFontColor: z.string(),
            accentBarColor: z.string(),
            backgrounds: z.array(z.string()),
        })),
    }),
});