import {DocumentDefinition} from "mongoose";
import {AnnouncementsData, AnnouncementsDocument, AnnouncementsModel} from "../models/announcements.model";
import {Announcement} from "../../../shared/values/Announcement";

export function updateOrCreateAnnouncements(announcements: Announcement[]): Promise<void> {
    return updateAnnouncements(announcements)
        .catch(() => createAnnouncements(announcements));  // try to create announcements instead
}

function createAnnouncements(announcements: Announcement[]): Promise<void> {

    const doc: DocumentDefinition<AnnouncementsData> = {
        announcementDataList: announcements,
    };

    //before creating an announcements, delete all announcements in the collection, to guarantee there ist only one stored at a tim
    return new Promise<void>((resolve, reject) => {
        AnnouncementsModel.remove().then(
            () => {
                AnnouncementsModel.create(doc).then(
                    () => {
                        AnnouncementsModel.findOne().then(
                            () => resolve(),
                            reason => reject(reason),
                        );
                    },
                    reason => reject(reason),
                );
            },
            reason => reject(reason),
        );
    });
}

function updateAnnouncements(announcements: Announcement[]): Promise<void> {

    const doc: DocumentDefinition<AnnouncementsData> = {
        announcementDataList: announcements,
    };

    return new Promise<void>((resolve, reject) => {
        AnnouncementsModel.findOneAndUpdate(undefined, doc).then(
            () => {
                AnnouncementsModel.findOne(undefined).then(
                    () => resolve(),
                    reason => reject(reason),
                );
            },
            reason => reject(reason),
        );
    });
}

export function getAnnouncements(): Promise<Announcement[]> {
    return new Promise<Announcement[]>((resolve, reject) => {
        AnnouncementsModel.findOne().then(
            (document: AnnouncementsDocument) => resolve(document.announcementDataList),
            reason => reject(reason)
        );
    });
}