import {DocumentDefinition} from "mongoose";
import {AnnouncementsModel} from "../models/announcements.model";
import {AnnouncementsData} from "../../../shared/interfaces/interfaces";
import {Announcement} from "../../../shared/values/Announcement";

export function createAnnouncements(announcements: Announcement[]): Promise<void> {

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

export function updateAnnouncements(announcements: Announcement[]): Promise<void> {

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
            document => resolve(document.announcementDataList),
            reason => reject(reason)
        );
    });
}