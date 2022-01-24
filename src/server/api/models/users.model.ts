import * as mongoose from "mongoose";

export interface UsersInput {
    usersDataList: {
        email: string;
        author: string;
    }[];
}

export interface UsersDocument extends UsersInput, mongoose.Document {
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
