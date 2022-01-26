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
                new Announcement("Trash", "bob@kit.edu", "Don't forget to take out the trash after class"),
                new Announcement("Life's Good", "alice@kit.edu", "It's almost time to leave for the day lets not forget that life's good"),
                new Announcement("Life's toll", "alice@kit.edu", "It's almost time to leave for the day lets not forget that life's good"),
                new Announcement("Life's very nice", "alice@kit.edu", "It's almost time to leave for the day lets not forget that life's good"),
                new Announcement("Life's amazing", "alice@kit.edu", "It's almost time to leave for the day lets not forget that life's good"),
            ];
            resolve(data);
        });
    }

    getVerifiedUsers(): Promise<VerifiedUser[]> {
        //todo
        return new Promise<VerifiedUser[]>(resolve => {
            const data = [
                new VerifiedUser("bob@kit.edu", "Gertan Vanderwalt"),
                new VerifiedUser("alice@kit.edu", "Alice May")
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