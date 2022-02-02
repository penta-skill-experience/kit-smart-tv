import {AnnouncementPersistence} from "./AnnouncementPersistence";
import config from "../persistence.config.json";
import {VerifiedUser} from "../../values/VerifiedUser";
import {ReadableUser} from "./ReadableUser";
import {IAnnouncement} from "../../values/IAnnouncement";

/**
 * This implementation of AnnouncementPersistence runs in the browser
 * and uses the fetch() API to access the database through our REST API.
 */
export class AnnouncementPersistenceFrontend extends AnnouncementPersistence {

    setAnnouncements(announcements: IAnnouncement[]) {

        const headers = new Headers();
        headers.append("x-refresh", sessionStorage.getItem('refreshToken'));
        headers.append("Authorization", `Bearer ${sessionStorage.getItem('accessToken')}`);
        headers.append("Content-Type", "application/json");

        //create body
        let body = {announcementDataList: announcements};

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
                                        if (o === announcements) {
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

    getAnnouncements(): Promise<IAnnouncement[]> {

        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        if (sessionStorage.getItem('accessToken') !== null) {
            headers.append("x-refresh", sessionStorage.getItem('refreshToken'));
            headers.append("Authorization", `Bearer ${sessionStorage.getItem('accessToken')}`);
        }

        return new Promise<IAnnouncement[]>((resolve, reject) => {
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

                    response.json()
                        .then((announcements: IAnnouncement[]) => {

                            resolve(announcements
                                .map(announcement => ({
                                    title: announcement.title,
                                    author: announcement.author,
                                    text: announcement.text,
                                    timeOfAddition: new Date(+announcement.timeOfAddition).valueOf(),
                                    timeout: new Date(+announcement.timeout).valueOf() - +announcement.timeOfAddition,
                                }))
                                .filter(announcement => announcement.timeout > Date.now())  // check for expiry
                            );

                        })
                        .catch(() => {
                            resolve([]);
                        });
                })
                .catch(() => {
                    reject();
                });
        });
    }

    getVerifiedUsers(): Promise<VerifiedUser[]> {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        if (sessionStorage.getItem('accessToken') !== null) {
            headers.append("x-refresh", sessionStorage.getItem('refreshToken'));
            headers.append("Authorization", `Bearer ${sessionStorage.getItem('accessToken')}`);
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
                        sessionStorage.setItem('accessToken', response.headers.get('x-access-token'));
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

        if (sessionStorage.getItem('accessToken') !== null) {
            headers.append("x-refresh", sessionStorage.getItem('refreshToken'));
            headers.append("Authorization", `Bearer ${sessionStorage.getItem('accessToken')}`);
        }
        let read_users: ReadableUser[] = [];
        users.forEach(user => read_users.push(new ReadableUser(user)))
        let body = {usersDataList: read_users};
        console.log(body);
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
                    if (response.status == 200) {
                        resolve();
                    } else {
                        reject();
                    }
                }).catch(() => reject());
        });
    }
}