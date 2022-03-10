import {Request, Response} from "express";
import {getAnnouncements} from "../services/announcements.services";


export function getAnnouncementsHandler(req: Request, res: Response): void {
    getAnnouncements()
        .then(announcements => {
            res.send(announcements);
        })
        .catch(reason => {
            res.status(501).send(`could not get announcement data: ${reason}`);
        });
}