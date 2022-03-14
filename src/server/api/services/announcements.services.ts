import {DocumentDefinition} from "mongoose";
import {
    AnnouncementsData,
    AnnouncementsDocument,
    AnnouncementsModel
} from "../models/announcements.model";
import {Announcement} from "../../../shared/values/Announcement";
import {WidgetDataModel} from "../models/widgetDataModel";
import {omit} from "lodash";
import {UsersModel} from "../models/users.model";

export function updateOrCreateAnnouncements(announcements: Announcement[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        updateAnnouncements(announcements)
            .then(() => {
                resolve()
            })
            .catch(() => {
                createAnnouncements(announcements)
                    .then(() => resolve())
                    .catch(() => reject())
            }); // try to create announcements instead
    });
}

export function createAnnouncements(announcements: Announcement[]): Promise<void> {

    const doc: DocumentDefinition<AnnouncementsData> = {
        announcementDataList: announcements,
    };

    //before creating an announcements, delete all announcements in the collection, to guarantee there ist only one stored at a tim
    return new Promise<void>((resolve, reject) => {
        AnnouncementsModel.deleteMany().then(
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
            reason => {

            },
        );
    });
}

export function updateAnnouncements(announcements: Announcement[]): Promise<void> {

    const doc: DocumentDefinition<AnnouncementsData> = {
        announcementDataList: announcements,
    };

    return new Promise<void>((resolve, reject) => {
        AnnouncementsModel.findOneAndUpdate(undefined, doc).then(
            doc => {
                if (doc === null) {
                    reject();
                } else {
                    resolve();
                }
            },
            reason => reject(reason)
        );
    });

}

export function getAnnouncements(): Promise<Announcement[]> {
    return new Promise<Announcement[]>((resolve, reject) => {
        AnnouncementsModel.findOne().then(
            (document: AnnouncementsDocument) => {
                if (document == null) {
                    reject("no announcements found");
                } else {
                    resolve(document.announcementDataList)
                }

            },
            reason => reject(reason)
        );
    });
}