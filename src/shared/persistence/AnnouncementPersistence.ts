import {Announcement} from "../../server/announcement_management/Announcement";
import {VerifiedUser} from "../values/VerifiedUser";
import {unirest} from "unirest";

export class AnnouncementPersistence {

    setAnnouncements(announcements: Announcement[]) {
        //todo
    }

    getAnnouncements(): Announcement[] {
        let accessToken: string;
        let refreshToken: string;
        var req = unirest('GET', 'http://localhost:80/announcements')
            .headers({
                'x-refresh': refreshToken,
                'Authorization': 'Bearer ' + accessToken
            })
            .end(function (res) {
                if (res.error) throw new Error(res.error);
                console.log(res.raw_body);


            });


        //todo
        return [];
    }

    getVerifiedUsers(): VerifiedUser[] {
        //todo
        return [];
    }

    addVerifiedUser(verifiedUser: VerifiedUser) {
        //todo
    }

    removeVerifiedUser(verifiedUser: VerifiedUser) {
        //todo
    }
}