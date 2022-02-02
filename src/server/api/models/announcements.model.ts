import * as mongoose from "mongoose";
import {AnnouncementsData} from "../../../shared/interfaces/interfaces";

export interface AnnouncementsDocument extends AnnouncementsData, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const AnnouncementsSchema = new mongoose.Schema({
    announcementDataList: {
        type: [new mongoose.Schema({
            title: {
                type: String,
                required: true,
            },
            text: {
                type: String,
                required: true,
            },
            author: {
                type: String,
                required: true,
            },
            timeout: {
                type: String,
                required: true,
            },
            timeOfAddition: {
                type: String,
                required: true,
            },
        })],
        required: true,
    }
}, {timestamps: true});

export const AnnouncementsModel = mongoose.model<AnnouncementsDocument>("Announcements", AnnouncementsSchema);
