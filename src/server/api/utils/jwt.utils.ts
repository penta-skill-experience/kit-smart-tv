import jwt from "jsonwebtoken";
import 'dotenv/config';

export function signJwt(
    object: Object,
    keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
    options?: jwt.SignOptions | undefined
) {
    const signingKey = Buffer.from(
        ((keyName === "accessTokenPrivateKey")?process.env.ACCESS_TOKEN_PRIVATE_KEY:process.env.REFRESH_TOKEN_PRIVATE_KEY),
        "base64"
    ).toString("ascii");

    return jwt.sign(object, signingKey, {
        ...(options && options),
        algorithm: "RS256",
    });
}

export function verifyJwt(
    token: string,
    keyName: "accessTokenPublicKey" | "refreshTokenPublicKey"
) {
    const publicKey = Buffer.from(((keyName === "accessTokenPublicKey")?process.env.ACCESS_TOKEN_PUBLIC_KEY:process.env.REFRESH_TOKEN_PUBLIC_KEY), "base64").toString(
        "ascii"
    );

    try {
        const decoded = jwt.verify(token, publicKey);
        return {
            valid: true,
            expired: false,
            decoded,
        };
    } catch (e: any) {
        //console.error(e);
        return {
            valid: false,
            expired: e.message === "jwt expired",
            decoded: null,
        };
    }
}