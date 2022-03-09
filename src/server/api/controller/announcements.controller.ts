import {Request, Response} from "express";
import {getAnnouncements, updateOrCreateAnnouncements} from "../services/announcements.services";

export function updateAnnouncementsHandler(req: Request, res: Response): void {
    console.log("got announcement request:");
    console.log(req);
    updateOrCreateAnnouncements(req.body)
        .then(() => {
            res.send();
        })
        .catch(reason => {
            res.status(400).send(`could not create announcement data: ${reason}`);
        });
}

export function getAnnouncementsHandler(req: Request, res: Response): void {
    getAnnouncements()
        .then(announcements => {
            res.send(announcements);
        })
        .catch(reason => {
            res.status(501).send(`could not get announcement data: ${reason}`);
        });
}