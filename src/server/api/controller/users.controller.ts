import {Request, Response} from "express";
import {getUsers, updateOrCreateUsers} from "../services/users.services";

export function updateUsersHandler(req: Request, res: Response): void {
    updateOrCreateUsers(req.body)
        .then(() => {
            res.send();
        })
        .catch(reason => {
            res.status(501).send(`Failed to update verified users in database: ${reason}`);
        });
}

export function getUsersHandler(req: Request, res: Response): void {
    getUsers()
        .then(users => {
            res.send(users);
        })
        .catch(reason => {
            res.status(501).send(`Failed to get verified users from database: ${reason}`);
        });
}