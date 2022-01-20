import { get } from "lodash";
import config from "../config.json";
import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { SessionDocument } from "../models/session.model";
import { verifyJwt, signJwt } from "../utils/jwt.utils";
import { getAdmin } from "./admin.service";

export async function createSession(adminId: string, userAgent: string) {
    const session = await SessionModel.create({ admin: adminId, userAgent });
    return session.toJSON();
}

export async function findSession(query: FilterQuery<SessionDocument>) {
    return SessionModel.findOne(query).lean();
}

export async function updateSession(
    query: FilterQuery<SessionDocument>,
    update: UpdateQuery<SessionDocument>
) {
    return SessionModel.updateOne(query, update);
}

export async function deleteSession(
    query: FilterQuery<SessionDocument>
) {
    return SessionModel.deleteOne(query);
}


export async function isValidSession(sessionId: string){
    const session = await SessionModel.findById(sessionId);
    if (!session) return false;

    let delta = Math.floor((Date.now() - session.updatedAt.valueOf()) / (1000*60));
    if(delta >= config.sessionTtlInMinutes){
        await deleteSession({ _id: sessionId});
        return false;
    }
    return true;


}

export async function reIssueAccessToken({
                                             refreshToken,
                                         }: {
    refreshToken: string;
}) {
    const { decoded } = verifyJwt(refreshToken, "refreshTokenPublicKey");

    if (!decoded || !get(decoded, "session")) return false;

    // const session = await SessionModel.findById(get(decoded, "session"));
    //
    // if (!session) return false;
    //
    // //nicht auf valid checken sondern, ob die session nicht schon abgelaufen ist, wenn abgelaufen dann löschen.
    // let delta = Math.floor((Date.now() - session.updatedAt.valueOf()) / (1000*60));
    // if(delta >= config.sessionTtlInMinutes){
    //     await deleteSession({ admin: get(decoded, "admin")._id});
    //     return false;
    // }
    if(!await isValidSession(get(decoded, "session"))) return false;

    const admin = await getAdmin();

    if (!admin) return false;

    return signJwt(
        { ...admin, session: get(decoded, "session") },
        "accessTokenPrivateKey",
        { expiresIn: config.accessTokenTtl } // 15 minutes
    );
}