import {VerifiedUser} from "../../values/VerifiedUser";
import {AnnouncementPersistenceFrontend} from "./AnnouncementPersistenceFrontend";
import {detectEnvironment, Environment} from "../../util/detectEnvironment";
import {AnnouncementPersistenceBackend} from "./AnnouncementPersistenceBackend";
import {IAnnouncement} from "../../values/IAnnouncement";

/**
 * Singleton that returns a frontend or backend implementation
 * depending on which system the JavaScript code is running on.
 */
export abstract class AnnouncementPersistence {

    // SINGLETON:

    private static readonly INSTANCE: AnnouncementPersistence = detectEnvironment() === Environment.NODE ?
        new AnnouncementPersistenceBackend() : new AnnouncementPersistenceFrontend();

    public static getInstance(): AnnouncementPersistence {
        return this.INSTANCE;
    }

    abstract setAnnouncements(announcements: IAnnouncement[]): Promise<void>;

    abstract getAnnouncements(): Promise<IAnnouncement[]>;

    abstract getVerifiedUsers(): Promise<VerifiedUser[]>;

    abstract setVerifiedUsers(users: VerifiedUser[]): Promise<void>;
}