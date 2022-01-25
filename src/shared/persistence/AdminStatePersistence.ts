import config from "./persistence.config.json";
import {TokenHolderSingleton} from "./TokenHolderSingleton";

export class AdminStatePersistence {

    login(password: string): Promise<void> {

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const body = {password: password};

        return new Promise<void>((resolve, reject) => {
            fetch(`${config.DOMAIN}/api/sessions`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body),
            })
                .then(response => response.json()
                    .then(data => {
                        TokenHolderSingleton.instance.accessToken = data.body.accessToken;
                        TokenHolderSingleton.instance.refreshToken = data.body.refreshToken;
                        resolve();
                    }).catch(() => reject())
                ).catch(() => reject());
        });
    }

    async logout(): Promise<void> {
        const headers = new Headers();
        headers.append("x-refresh", TokenHolderSingleton.instance.refreshToken);
        headers.append("Authorization", `Bearer ${TokenHolderSingleton.instance.accessToken}`);
        headers.append("Content-Type", "application/json");

        return new Promise<void>((resolve, reject) => {
            fetch(`${config.DOMAIN}/api/sessions`, {
                method: 'DELETE',
                headers: headers,
                body: JSON.stringify(null),
            })
                .then(response => response.json()
                    .then(data => {
                        if (data.body.accessToken == null && data.body.refreshToken == null) {
                            TokenHolderSingleton.instance.accessToken = undefined;
                            TokenHolderSingleton.instance.refreshToken = undefined;
                            resolve();
                        } else {
                            reject();
                        }
                    }).catch(() => reject())
                ).catch(() => reject());
        });
    }

    async getAdminLoginState(access_token: string, refresh_token: string): Promise<boolean> {
        const response = await fetch(`${config.DOMAIN}/api/sessions`, {
            method: 'GET',
            body: null,
            headers: {
                'Content-Type': 'application/json',
                'x-refresh': refresh_token,
                'Authorization': 'Bearer ' + access_token,
            }
        });
        try {
            const myJson = await response.json(); //extract JSON from the http response
            if (new Date(myJson.valid_until).valueOf() > Date.now()) {
                return true;
            }
        } catch (e: any) {
            return false;
        }
        return false;
    }

    async setPassword(oldpw: string, newpw: string, access_token: string, refresh_token: string): Promise<boolean> {
        const response = await fetch(`${config.DOMAIN}/admin/update-password`, {
            method: 'PUT',
            body: JSON.stringify({password: oldpw, new_password: newpw}),
            headers: {
                'Content-Type': 'application/json',
                'x-refresh': refresh_token,
                'Authorization': 'Bearer ' + access_token,
            }
        });
        try { //extract JSON from the http response
            if ("password updated" === JSON.stringify(response.body)) {
                return true;
            }
        } catch (e: any) {
            return false;
        }
        return false;
    }
}