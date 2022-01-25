import * as https from "https";

export class AdminStatePersistence {
    get refresh_token(): string {
        return this._refresh_token;
    }
    get access_token(): string {
        return this._access_token;
    }
    private _access_token: string;
    private _refresh_token: string;
    constructor() {
    }

    async login(password: string) : Promise<boolean> {
        const response = await fetch('http://localhost:80/api/sessions', {
            method: 'POST',
            body: JSON.stringify(password), // string or object
            headers: {
                'Content-Type': 'application/json'
            }
        });
        try{
            const myJson = await response.json(); //extract JSON from the http response
            if(myJson){
                this._access_token = myJson.accessToken;
                this._refresh_token = myJson.refreshToken;
                return true;
            }
        }
        catch(e: any)
        {
            return false;
        }
        return false;
    }

    async logout(access_token: string, refresh_token: string): Promise<boolean> {
        const response = await fetch('http://localhost:80/api/sessions', {
            method: 'DELETE',
            body: null, // string or object
            headers: {
                'Content-Type': 'application/json',
                'x-refresh': refresh_token,
                'Authorization': 'Bearer ' + access_token,
    }
        });
        try{
            const myJson = await response.json(); //extract JSON from the http response
            if(myJson){
                this._access_token = myJson.accessToken;
                this._refresh_token = myJson.refreshToken;
                return true;
            }
        }
        catch(e: any)
        {
            return false;
        }
        return false;
    }

    async getAdminLoginState(access_token: string, refresh_token: string) {
        var options = {
        'method': 'GET',
        'hostname': 'localhost',
        'port': 80,
        'path': '/api/sessions',
        'headers': {
            'x-refresh': this._refresh_token,
            'Authorization': 'Bearer ' + this._access_token
        },
        'maxRedirects': 20
    };

        var req = https.request(options, function (res) {
            var chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function (chunk) {
                var body = Buffer.concat(chunks);
                console.log(body.toString());
                return true;
            });

            res.on("error", function (error) {
                console.error(error);
                return false
            });
        });

        req.end();

        //accessToken = res.headers["x-access-token"];
    }

    async setPassword(oldpw: string, newpw: string, access_token: string, refresh_token: string): Promise<boolean> {
        const response = await fetch('http://localhost:80/admin/update-password', {
            method: 'PUT',
            body: JSON.stringify({password: oldpw, new_password: newpw}),
            headers: {
                'Content-Type': 'application/json',
                'x-refresh': refresh_token,
                'Authorization': 'Bearer ' + access_token,
            }
        });
        try { //extract JSON from the http response
            if ( "password updated" === JSON.stringify(response.body)) {
                return true;
            }
        } catch (e: any) {
            return false;
        }
        return false;
    }
}