import {Announcement} from "../../server/announcement_management/Announcement";
import {VerifiedUser} from "../values/VerifiedUser";
export class AnnouncementPersistence {

    setAnnouncements(announcements: Announcement[]) {
        //todo
    }

    getAnnouncements(): Promise<Announcement[]> {
        //todo
        return new Promise<Announcement[]>(resolve => {
            const data = [
                new Announcement("Hello World", "bob@kit.edu", "What's going on?"),
                new Announcement("Wello Horld", "alice@kit.edu", "That's going on!"),
            ];
            resolve(data);
        });
    }

    getVerifiedUsers(): Promise<VerifiedUser[]> {
        //todo
        return new Promise<VerifiedUser[]>(resolve => {
            const data = [
                new VerifiedUser("bob@kit.edu", "Bob"),
                new VerifiedUser("alice@kit.edu", "Alice")
            ]
            resolve(data);
        });
    }

    addVerifiedUser(verifiedUser: VerifiedUser) {
        //todo
    }

    removeVerifiedUser(verifiedUser: VerifiedUser) {
        //todo
    }
}