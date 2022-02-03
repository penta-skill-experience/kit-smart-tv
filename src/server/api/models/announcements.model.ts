import * as mongoose from "mongoose";
import {Announcement} from "../../../shared/values/Announcement";

export interface AnnouncementsData {
    announcementDataList: Announcement[];
}

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
                type: Number,
                required: true,
            },
            timeOfAddition: {
                type: Number,
                required: true,
            },
        })],
        required: true,
    }
}, {timestamps: true});

export const AnnouncementsModel = mongoose.model<AnnouncementsDocument>("Announcements", AnnouncementsSchema);
