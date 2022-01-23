import { z } from "zod";

export const updateValuesSchema = z.object({
    body: z.object({
        fontSizes: z.array(z.object({
            id: z.string(),
            titleFontSize: z.number(),
            bodyFontSize: z.number(),
            specialFontSize: z.number(),
            specialFontSizeAccent: z.number(),
        })),
        colorSchemes: z.array(z.object({
            id: z.string(),
            titleColor: z.string(),
            bodyColor: z.string(),
            specialBoldColor: z.string(),
            specialSubtleColor: z.string(),
            accentBarColor: z.string(),
            backgrounds: z.array(z.object({
                id: z.string(),
                url: z.string().url(),
            })),
        })),
    }),
});