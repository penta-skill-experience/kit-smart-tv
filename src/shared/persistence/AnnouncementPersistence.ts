import {Announcement} from "../../server/announcement_management/Announcement";
import {VerifiedUser} from "../values/VerifiedUser";
import config from "./persistence.config.json";


export class AnnouncementPersistence {

    setAnnouncements(announcements: Announcement[]) {

        const headers = new Headers();
        headers.append("x-refresh", sessionStorage.getItem('refreshToken'));
        headers.append("Authorization", `Bearer ${sessionStorage.getItem('accessToken')}`);
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
                        sessionStorage.setItem('accessToken', response.headers.get('x-access-token'));
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

        if(sessionStorage.getItem('accessToken') !== null){
            headers.append("x-refresh", sessionStorage.getItem('refreshToken'));
            headers.append("Authorization", `Bearer ${sessionStorage.getItem('accessToken')}`);
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
                        sessionStorage.setItem('accessToken', response.headers.get('x-access-token'));
                    }
                    return response.json()
                        .then(data => {
                            let announcements: Announcement[] = [];
                            data.announcementDataList.forEach(function (announcement) {
                                let ann = new Announcement(announcement.title, announcement.author, announcement.text, new Date(+announcement.timeOfAddition).valueOf(), new Date(+announcement.timeout).valueOf() - +announcement.timeOfAddition);
                                if (ann.timeout > Date.now()) {
                                    announcements.push(ann);
                                }

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
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        if(TokenHolderSingleton.instance.accessToken !== null){
            headers.append("x-refresh", TokenHolderSingleton.instance.refreshToken);
            headers.append("Authorization", `Bearer ${TokenHolderSingleton.instance.accessToken}`);
        }

        return new Promise<VerifiedUser[]>((resolve, reject) => {
            fetch(`${config.DOMAIN}/users`, {
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
                            let users: VerifiedUser[] = [];
                            data.usersDataList.forEach(function (user) {
                                let u = new VerifiedUser(user.email, user.name);
                                users.push(u);
                            });
                            resolve(users);

                        }).catch(() => {
                            let users: VerifiedUser[] = [];
                            resolve(users);
                        });
                }).catch(() => reject());
        });
    }

    setVerifiedUsers(users: VerifiedUser[]): Promise<void> {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        if(TokenHolderSingleton.instance.accessToken !== null){
            headers.append("x-refresh", TokenHolderSingleton.instance.refreshToken);
            headers.append("Authorization", `Bearer ${TokenHolderSingleton.instance.accessToken}`);
        }
        let read_users: ReadableUser[] = [];
        users.forEach(user => read_users.push(new ReadableUser(user)))
        let body = {usersDataList: read_users};

        return new Promise<void>((resolve, reject) => {
            fetch(`${config.DOMAIN}/users`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(body),
            })
                .then(response => {
                    const new_accessToken = response.headers.get('x-access-token');
                    if (new_accessToken) {
                        //if a new accessToken is provided, update it.
                        sessionStorage.setItem('accessToken', response.headers.get('x-access-token'));
                    }
                    if(response.status == 200){
                        resolve();
                    }
                    else {
                        reject();
                    }
                }).catch(() => reject());
        });
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

class ReadableUser {
    public email: string;
    public name: string;

    public constructor(user: VerifiedUser) {
        this.email = user.email;
        this.name = user.name;
    }
}