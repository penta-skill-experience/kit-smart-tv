import {Request, Response} from "express";
import {createAnnouncements, getAnnouncements, updateAnnouncements} from "../services/announcements.services";

export async function updateAnnouncementsHandler(req: Request, res: Response) {
    try {
        return res.send(await updateAnnouncements(req.body));
    } catch (e) {
        try {
            return res.send(await createAnnouncements(req.body));
        } catch (e) {
            return res.status(400).send(`could not create announcement data: ${e.message}`);
        }
    }
}


export async function getAnnouncementsHandler(req: Request, res: Response){
    try {
        return res.send(await getAnnouncements());
    }
    catch(e: any){
        return res.status(501).send(`could not get announcement data: ${e.message}`);
    }
}