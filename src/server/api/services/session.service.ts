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

export async function findSessions(query: FilterQuery<SessionDocument>) {
    return SessionModel.find(query).lean();
}

export async function updateSession(
    query: FilterQuery<SessionDocument>,
    update: UpdateQuery<SessionDocument>
) {
    return SessionModel.updateOne(query, update);
}

export async function reIssueAccessToken({
                                             refreshToken,
                                         }: {
    refreshToken: string;
}) {
    const { decoded } = verifyJwt(refreshToken, "refreshTokenPublicKey");

    if (!decoded || !get(decoded, "session")) return false;

    const session = await SessionModel.findById(get(decoded, "session"));

    if (!session || !session.valid) return false;

    const admin = await getAdmin();

    if (!admin) return false;

    return signJwt(
        { ...admin, session: session._id },
        "accessTokenPrivateKey",
        { expiresIn: config.accessTokenTtl } // 15 minutes
    );
}