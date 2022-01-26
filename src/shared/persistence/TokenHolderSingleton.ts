/**
 * A singleton to hold the access token and the refresh token for interaction with the REST API.
 */
export class TokenHolderSingleton {

    private static _instance : TokenHolderSingleton = new TokenHolderSingleton();

    accessToken : string;
    refreshToken : string;

    private constructor() {
    }

    /**
     * Returns the singleton instance.
     */
    static get instance(): TokenHolderSingleton {
        return this._instance;
    }
}