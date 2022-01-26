/**
 * A singleton to hold the access token and the refresh token for interaction with the REST API.
 */
export class TokenHolderSingleton {

    private _instance : TokenHolderSingleton = new TokenHolderSingleton();

    accessToken : string;
    refreshToken : string;

    private constructor() {
    }

    /**
     * Returns the singleton instance.
     */
    get instance(): TokenHolderSingleton {
        return this._instance;
    }
}