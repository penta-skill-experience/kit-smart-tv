import * as mongoose from "mongoose";
import {IVerifiedUser} from "../../../shared/values/IVerifiedUser";

export interface VerifiedUsersData {
    usersDataList: IVerifiedUser[];
}

export interface UsersDocument extends VerifiedUsersData, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const UsersSchema = new mongoose.Schema({
    usersDataList: {
        type: [new mongoose.Schema({
            email: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
        })],
        required: true,
    }
}, {timestamps: true});

export const UsersModel = mongoose.model<UsersDocument>("Users", UsersSchema);
