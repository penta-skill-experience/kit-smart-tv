import {AnnouncementPersistence} from "./AnnouncementPersistence";
import config from "../persistence.config.json";
import {VerifiedUser} from "../../values/VerifiedUser";
import {Announcement} from "../../values/Announcement";
import {IVerifiedUser} from "../../values/IVerifiedUser";

/**
 * This implementation of AnnouncementPersistence runs in the browser
 * and uses the fetch() API to access the database through our REST API.
 */
export class AnnouncementPersistenceFrontend implements AnnouncementPersistence {

    setAnnouncements(announcements: Announcement[]) {

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
        if (sessionStorage.getItem('accessToken') !== null) {
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

                    response.json()
                        .then((announcements: Announcement[]) => {

                            resolve(announcements
                                .filter(announcement => announcement.timeout > Date.now())  // check for expiry
                            );

                        })
                        .catch(reason => {
                            reject(reason);
                        });
                })
                .catch(reason => {
                    reject(reason);
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
                        .then(users => {
                            resolve(users.map(user => new VerifiedUser(user.email, user.name)));
                        }).catch(reason => {
                            reject(reason);
                        });
                }).catch((reason) => reject(reason));
        });
    }

    setVerifiedUsers(users: VerifiedUser[]): Promise<void> {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        if (sessionStorage.getItem('accessToken') !== null) {
            headers.append("x-refresh", sessionStorage.getItem('refreshToken'));
            headers.append("Authorization", `Bearer ${sessionStorage.getItem('accessToken')}`);
        }

        const readableUsers: IVerifiedUser[] = users.map(user => ({
            email: user.email,
            name: user.name,
        }));

        return new Promise<void>((resolve, reject) => {
            fetch(`${config.DOMAIN}/users`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(readableUsers),
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