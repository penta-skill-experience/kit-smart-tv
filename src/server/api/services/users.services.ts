import {DocumentDefinition} from "mongoose";
import {UsersDocument, UsersModel, VerifiedUsersData} from "../models/users.model";
import {IVerifiedUser} from "../../../shared/values/IVerifiedUser";

export function updateOrCreateUsers(users: IVerifiedUser[]) {
    return updateUsers(users)
        .catch(() => createUsers(users));  // try to create users instead
}

export function createUsers(users: IVerifiedUser[]): Promise<void> {
    //before creating a Users, delete all Users in the collection, to guarantee there ist only one stored at a time

    const doc: DocumentDefinition<VerifiedUsersData> = {
        usersDataList: users,
    };

    return new Promise<void>((resolve, reject) => {
        UsersModel.deleteMany().then(
            () => {
                UsersModel.create(doc).then(
                    () => resolve(),
                    reason => reject(reason),
                )
            },
            reason => reject(reason),
        );
    });
}

function updateUsers(users: IVerifiedUser[]): Promise<void> {

    const doc: DocumentDefinition<VerifiedUsersData> = {
        usersDataList: users,
    };

    return new Promise<void>((resolve, reject) => {
        UsersModel.findOneAndUpdate(undefined, doc).then(
            () => resolve(),
            reason => reject(reason)
        );
    });
}

export function getUsers(): Promise<IVerifiedUser[]> {
    return new Promise<IVerifiedUser[]>((resolve, reject) => {
        UsersModel.findOne().then(
            (document: UsersDocument) => {
                if (document == null){
                    reject("no users found")
                }
                else{
                    resolve(document.usersDataList)
                }
            },
            reason => reject(reason));
    });
}