import {DocumentDefinition} from "mongoose";
import {omit} from "lodash";
import {AnnouncementsInput, AnnouncementsModel} from "../models/announcements.model";

export async function createAnnouncements(input: DocumentDefinition<AnnouncementsInput>) {
    //before creating an announcementst, delete all announcements in the collection, to guarantee there ist only one stored at a time
    //delete all
    await AnnouncementsModel.remove({});
    await AnnouncementsModel.create(input);
    return await AnnouncementsModel.findOne({}).then(o => omit(o.toJSON(), ["_id", "createdAt", "updatedAt", "__v"]));
}

export async function updateAnnouncements(input: DocumentDefinition<AnnouncementsInput>) {
    await AnnouncementsModel.findOneAndUpdate({}, input);
    return await AnnouncementsModel.findOne({}).then(o => omit(o.toJSON(), ["_id", "createdAt", "updatedAt", "__v"]));

}

export async function getAnnouncements() {
    return await AnnouncementsModel.findOne({}).then(o => omit(o.toJSON(), ["_id", "createdAt", "updatedAt", "__v"]));
}