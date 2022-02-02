import config from "./persistence.config.json";

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
                        sessionStorage.setItem('accessToken', data.accessToken);
                        sessionStorage.setItem('refreshToken', data.refreshToken);
                        resolve();
                    }).catch(() => reject())
                ).catch(() => reject());
        });
    }

    async logout(): Promise<void> {
        const headers = new Headers();
        headers.append("x-refresh", sessionStorage.getItem('refreshToken'));
        headers.append("Authorization", `Bearer ${sessionStorage.getItem('accessToken')}`);
        headers.append("Content-Type", "application/json");

        return new Promise<void>((resolve, reject) => {
            fetch(`${config.DOMAIN}/api/sessions`, {
                method: 'DELETE',
                headers: headers,
            })
                .then(response => response.json()
                    .then(data => {
                        if (data.accessToken == null && data.refreshToken == null) {
                            sessionStorage.removeItem('accessToken');
                            sessionStorage.removeItem('refreshToken');
                            resolve();
                        } else {
                            reject();
                        }
                    }).catch(() => reject())
                ).catch(() => reject());
        });
    }

    async getAdminLoginState(): Promise<void> {
        const headers = new Headers();
        headers.append("x-refresh", sessionStorage.getItem('refreshToken'));
        headers.append("Authorization", `Bearer ${sessionStorage.getItem('accessToken')}`);
        headers.append("Content-Type", "application/json");

        return new Promise<void>((resolve, reject) => {
            fetch(`${config.DOMAIN}/api/sessions`, {
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
                            if (data.valid_until) {
                                resolve();
                            } else {
                                reject();
                            }
                        }).catch(() => reject());

                }).catch(() => reject());
        });
    }


    async setPassword(oldpw: string, newpw: string,): Promise<void> {
        const headers = new Headers();
        headers.append("x-refresh", sessionStorage.getItem('refreshToken'));
        headers.append("Authorization", `Bearer ${sessionStorage.getItem('accessToken')}`);
        headers.append("Content-Type", "application/json");

        const body = {
            password: oldpw,
            new_password: newpw
        };

        return new Promise<void>((resolve, reject) => {
            fetch(`${config.DOMAIN}/admin/update-password`, {
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
                    }
                    reject();
                })
                .catch(() => reject());
        });
    }
}