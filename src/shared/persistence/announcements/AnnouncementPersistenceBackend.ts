import {AnnouncementPersistence} from "./AnnouncementPersistence";
import {VerifiedUser} from "../../values/VerifiedUser";
import {
    createAnnouncements,
    getAnnouncements,
    updateAnnouncements
} from "../../../server/api/services/announcements.services";
import {IAnnouncement} from "../../values/IAnnouncement";

/**
 * This implementation of AnnouncementPersistence runs on Node
 * and directly accesses the database without the usage of a REST API.
 */
export class AnnouncementPersistenceBackend extends AnnouncementPersistence {

    setAnnouncements(announcements: IAnnouncement[]): Promise<void> {
        return updateAnnouncements(announcements)
            .catch(() => createAnnouncements(announcements));  // try to create announcements instead
    }

    getAnnouncements(): Promise<IAnnouncement[]> {
        return getAnnouncements();
    }

    getVerifiedUsers(): Promise<VerifiedUser[]> {
        //todo
        return Promise.resolve([]);
    }

    setVerifiedUsers(users: VerifiedUser[]): Promise<void> {
        //todo
        return Promise.resolve(undefined);
    }

}