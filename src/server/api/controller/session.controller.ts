import { Request, Response } from "express";
import config from "../config.json";
import {
    createSession, deleteSession,
    findSession,
    updateSession,
} from "../services/session.service";
import { validatePassword } from "../services/admin.service";
import { signJwt } from "../utils/jwt.utils";

export async function createAdminSessionHandler(req: Request, res: Response) {
    // Validate the admin's password
    const admin = await validatePassword(req.body);

    if (!admin) {
        return res.status(401).send("Invalid password");
    }

    // nur createn wenn es keine valid session gibt, sonst error return, dass access verweigert ist.
    const session_previously_started = await findSession({ valid: true });
    if(session_previously_started){
        return res.status(405).send("already logged in");
    }
    // create a session
    const session = await createSession(admin._id, req.get("user-agent") || "");

    // create an access token

    const accessToken = signJwt(
        { ...admin, session: session._id },
        "accessTokenPrivateKey",
        { expiresIn: config.accessTokenTtl} // 15 minutes,
    );

    // create a refresh token
    const refreshToken = signJwt(
        { ...admin, session: session._id },
        "refreshTokenPrivateKey",
        { expiresIn: config.refreshTokenTtl} // 1y
    );

    // return access & refresh tokens

    return res.send({ accessToken, refreshToken });
}

export async function getSessionHandler(req: Request, res: Response) {
    const adminId = res.locals.admin._id;

    const session = await findSession({ admin: adminId, valid: true });

    if (!session) {
        return res.status(401).send("Invalid password");
    }


    let delta = Math.floor((Date.now() - session.updatedAt.valueOf()) / (1000*60));
    if(delta >= config.sessionTtlInMinutes){
        await deleteSession({ admin: adminId});
        return res.status(401).send("Session expired. Please log in.");
    }

    await updateSession({ _id: session._id }, { valid: true });
    const valid_until = new Date(Date.now() + config.sessionTtlInMinutes*60*1000);

    return res.send({session, valid_until});
}

export async function deleteSessionHandler(req: Request, res: Response) {
    const sessionId = res.locals.admin.session;

    await deleteSession({ _id: sessionId });

    return res.send({
        accessToken: null,
        refreshToken: null,
    });
}