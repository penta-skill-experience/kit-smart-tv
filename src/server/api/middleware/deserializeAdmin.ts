import {get} from "lodash";
import {Request, Response, NextFunction} from "express";
import {verifyJwt} from "../utils/jwt.utils";
import {reIssueAccessToken} from "../services/session.service";

const deserializeAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = get(req, "headers.authorization", "")
        .replace(/^Bearer\s/, "");

    const refreshToken = get(req, "headers.x-refresh");

    if (!accessToken) {
        return next();
    }

    const {decoded, expired} = verifyJwt(accessToken, "accessTokenPublicKey");

    if (decoded) {
        res.locals.admin = decoded;
        return next();
    }

    if (expired && refreshToken) {
        const newAccessToken = await reIssueAccessToken({refreshToken});

        if (newAccessToken) {
            res.setHeader("x-access-token", newAccessToken);
        }

        const result = verifyJwt(newAccessToken as string, "accessTokenPublicKey");

        res.locals.admin = result.decoded;
        return next();
    }

    return next();
};

export default deserializeAdmin;