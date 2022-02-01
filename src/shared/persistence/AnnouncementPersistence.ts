import {Announcement} from "../../server/announcement_management/Announcement";
import {VerifiedUser} from "../values/VerifiedUser";
import {TokenHolderSingleton} from "./TokenHolderSingleton";
import config from "./persistence.config.json";


export class AnnouncementPersistence {

    setAnnouncements(announcements: Announcement[]) {

        const headers = new Headers();
        headers.append("x-refresh", TokenHolderSingleton.instance.refreshToken);
        headers.append("Authorization", `Bearer ${TokenHolderSingleton.instance.accessToken}`);
        headers.append("Content-Type", "application/json");

        //create body
        let read_ann: ReadableAnnouncement[] = [];
        announcements.forEach(announcement => read_ann.push(new ReadableAnnouncement(announcement)))
        let body = {announcementDataList: read_ann};

        const requestOptions = {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(body),
        };

        return new Promise<void>((resolve, reject) => {
            fetch(`${config.DOMAIN}/announcements`, requestOptions)
                .then(response => {
                    const new_accessToken = response.headers.get('x-access-token');
                    if (new_accessToken) {
                        //if a new accessToken is provided, update it.
                        TokenHolderSingleton.instance.accessToken = response.headers.get('x-access-token');
                    }
                    if (response.status == 200) {
                        response.json()
                            .then(() => {
                                //check if the data wa written correctly
                                this.getAnnouncements()
                                    .then(o => {
                                        if (o === announcements){
                                            resolve();
                                        } else {
                                            reject();
                                        }
                                    })
                            })
                            .catch(() => reject());
                        resolve();
                    }
                    reject();
                })
                .catch(() => reject());
        });

    }

    getAnnouncements(): Promise<Announcement[]> {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        if(TokenHolderSingleton.instance.accessToken !== null){
            headers.append("x-refresh", TokenHolderSingleton.instance.refreshToken);
            headers.append("Authorization", `Bearer ${TokenHolderSingleton.instance.accessToken}`);
        }

        return new Promise<Announcement[]>((resolve, reject) => {
            fetch(`${config.DOMAIN}/announcements`, {
                method: 'GET',
                headers: headers,
            })
                .then(response => {
                    const new_accessToken = response.headers.get('x-access-token');
                    if (new_accessToken) {
                        //if a new accessToken is provided, update it.
                        TokenHolderSingleton.instance.accessToken = response.headers.get('x-access-token');
                    }
                    return response.json()
                        .then(data => {
                            let announcements: Announcement[] = [];
                            data.announcementDataList.forEach(function (announcement) {
                                let ann = new Announcement(announcement.title, announcement.author, announcement.text, new Date(+announcement.timeOfAddition).valueOf(), new Date(+announcement.timeout).valueOf() - +announcement.timeOfAddition);
                                announcements.push(ann);
                            });
                            resolve(announcements);

                        }).catch(() => {
                            let announcements: Announcement[] = [];
                            resolve(announcements);
                        });
                }).catch(() => reject());
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
        console.log(verifiedUser);
    }

    removeVerifiedUser(verifiedUser: VerifiedUser) {
        console.log(verifiedUser);
    }


}

class ReadableAnnouncement {
    public title: string;
    public author: string
    public timeOfAddition: string;
    public timeout: string;
    public text: string;

    public constructor(ann: Announcement) {
        this.title = ann.title;
        this.author = ann.author;
        this.text = ann.text;
        this.timeOfAddition = ann.timeOfAddition.toString();
        this.timeout = ann.timeout.toString();
    }
}