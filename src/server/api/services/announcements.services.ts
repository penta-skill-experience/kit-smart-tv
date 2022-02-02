import {DocumentDefinition} from "mongoose";
import {omit} from "lodash";
import {AnnouncementsModel} from "../models/announcements.model";
import {AnnouncementsData} from "../../../shared/interfaces/interfaces";

export async function createAnnouncements(input: DocumentDefinition<AnnouncementsData>) {
    //before creating an announcementst, delete all announcements in the collection, to guarantee there ist only one stored at a time
    //delete all
    await AnnouncementsModel.remove({});
    await AnnouncementsModel.create(input);
    return await AnnouncementsModel.findOne({}).then(o => omit(o.toJSON(), ["_id", "createdAt", "updatedAt", "__v"]));
}

export async function updateAnnouncements(input: DocumentDefinition<AnnouncementsData>) {
    await AnnouncementsModel.findOneAndUpdate({}, input);
    return await AnnouncementsModel.findOne({}).then(o => omit(o.toJSON(), ["_id", "createdAt", "updatedAt", "__v"]));

}

export async function getAnnouncements() {
    return AnnouncementsModel.findOne({}).then(o => {
        if(o != null){
            return omit(o.toJSON(), ["_id", "createdAt", "updatedAt", "__v"]);
        }
        return {};
    });
}