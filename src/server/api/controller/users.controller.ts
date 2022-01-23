import {Request, Response} from "express";
import {createUsers, getUsers, updateUsers} from "../services/users.services";

export async function updateUsersHandler(req: Request, res: Response) {
    try {
        return res.send(await updateUsers(req.body));
    } catch (e) {
        try {
            return res.send(await createUsers(req.body));
        } catch (e) {
            return res.status(400).send(`could not create user data: ${e.message}`);
        }
    }
}


export async function getUsersHandler(req: Request, res: Response){
    try {
        return res.send(await getUsers());
    }
    catch(e: any){
        return res.status(501).send(`could not get user data: ${e.message}`);
    }
}