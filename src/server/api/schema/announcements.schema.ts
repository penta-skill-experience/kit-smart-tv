import { z } from "zod";

export const updateAnnouncementsSchema = z.object({
    body: z.object({
        announcementDataList: z.array(z.object({
            title: z.string(),
            text: z.string(),
            author: z.string().email(),
            timeout: z.string(),
            timeOfAddition: z.string(),
        })),
    }),
});