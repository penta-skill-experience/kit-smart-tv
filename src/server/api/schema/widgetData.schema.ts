import { z } from "zod";

export const updateWidgetSchema = z.object({
    body: z.object({
        widgetDataList: z.array(z.object({
            widgetId: z.string(),
            location: z.number(),
            rawConfig: z.optional(z.any()),
        })),
    }),
});