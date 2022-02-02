import { AnnouncementPersistence } from "./AnnouncementPersistence";
import {Announcement} from "../../../server/announcement_management/Announcement";
import {VerifiedUser} from "../../values/VerifiedUser";

/**
 * This implementation of AnnouncementPersistence runs on Node
 * and directly accesses the database without the usage of a REST API.
 */
export class AnnouncementPersistenceBackend extends AnnouncementPersistence {

    getAnnouncements(): Promise<Announcement[]> {
        //todo
        return Promise.resolve([]);
    }

    getVerifiedUsers(): Promise<VerifiedUser[]> {
        //todo
        return Promise.resolve([]);
    }

    setAnnouncements(announcements: Announcement[]): Promise<void> {
        //todo
        return Promise.resolve(undefined);
    }

    setVerifiedUsers(users: VerifiedUser[]): Promise<void> {
        //todo
        return Promise.resolve(undefined);
    }

}