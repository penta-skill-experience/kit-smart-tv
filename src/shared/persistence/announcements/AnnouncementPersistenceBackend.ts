import {AnnouncementPersistence} from "./AnnouncementPersistence";
import {VerifiedUser} from "../../values/VerifiedUser";
import {
    getAnnouncements,
    updateOrCreateAnnouncements
} from "../../../server/api/services/announcements.services";
import {Announcement} from "../../values/Announcement";
import {getUsers, updateOrCreateUsers} from "../../../server/api/services/users.services";
import {IVerifiedUser} from "../../values/IVerifiedUser";

/**
 * This implementation of AnnouncementPersistence runs on Node
 * and directly accesses the database without the usage of a REST API.
 */
export class AnnouncementPersistenceBackend implements AnnouncementPersistence {

    setAnnouncements(announcements: Announcement[]): Promise<void> {
        return updateOrCreateAnnouncements(announcements);
    }

    getAnnouncements(): Promise<Announcement[]> {
        return getAnnouncements();
    }

    getVerifiedUsers(): Promise<VerifiedUser[]> {
        return getUsers()
            .then((users: IVerifiedUser[]) => users.map(u => new VerifiedUser(u.email, u.name)));
    }

    setVerifiedUsers(users: VerifiedUser[]): Promise<void> {
        return updateOrCreateUsers(users.map(u => ({
            email: u.email,
            name: u.name,
        })));
    }

}