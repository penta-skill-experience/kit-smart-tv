import {DocumentDefinition} from "mongoose";
import {omit} from "lodash";
import {AnnouncementsInput, AnnouncementsModel} from "../models/announcements.model";

export function createAnnouncements(input: DocumentDefinition<AnnouncementsInput>) {
    //before creating a announcementst, delete all announcements in the collection, to guarantee there ist only one stored at a time
    //delete all
    AnnouncementsModel.remove({});
    return AnnouncementsModel.create(input).then(o => omit(o.toJSON(), ["_id", "createdAt", "updatedAt", "__v"]));
}

export function updateAnnouncements(input: DocumentDefinition<AnnouncementsInput>) {
    return AnnouncementsModel.findOneAndUpdate({}, input).then(o => omit(o.toJSON(), ["_id", "createdAt", "updatedAt", "__v"]));
}

export function getAnnouncements() {
    return AnnouncementsModel.findOne({}).then(o => {
        omit(o.toJSON(), ["_id", "createdAt", "updatedAt", "__v"]);
    });
}